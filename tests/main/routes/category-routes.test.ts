import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'
import faker from 'faker'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import FakeObjectId from 'bson-objectid'

let categoryCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<any> => {
  const res = await accountCollection.insertOne({
    name: 'Rafael',
    email: 'rafaelcbm@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return { accessToken, id }
}

describe('Category Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /categories', () => {
    test('Should return 403 on add category without accessToken', async () => {
      await request(app)
        .post('/api/categories')
        .send({
          name: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 200 on add category with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: faker.random.word(),
          root: faker.random.word(),
          ancestors: [faker.random.word(),faker.random.word()]
        })
        .expect(200)
    })

    test('Should return 400 on add category with existing category name', async () => {
      const { accessToken, id } = await mockAccessToken()
      const res = await categoryCollection.insertOne({
        accountId: id,
        name: faker.random.word(),
        root: faker.random.word(),
        ancestors: [faker.random.word(),faker.random.word()]
      })
      const categoryName = res.ops[0].name

      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: categoryName,
          root: faker.random.word(),
          ancestors: [faker.random.word(),faker.random.word()]
        })
        .expect(400)
    })
  })

  describe('GET /categories', () => {
    test('Should return 403 on load categories without accessToken', async () => {
      await request(app)
        .get('/api/categories')
        .expect(403)
    })

    test('Should return 200 on load categories with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/categories')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE /categories', () => {
    test('Should return 403 on remove category without accessToken', async () => {
      await request(app)
        .delete('/api/categories/any_id')
        .send()
        .expect(403)
    })

    test('Should return 204 on remove category with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const res = await categoryCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const categoryId = res.ops[0]._id

      await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })

    test('Should return 400 on remove category without categoryId', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .delete(`/api/categories/${FakeObjectId.generate()}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(400)
    })
  })
})
