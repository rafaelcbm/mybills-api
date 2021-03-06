import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import FakeObjectId from 'bson-objectid'
import faker from 'faker'

let walletCollection: Collection
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

describe('Wallet Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /wallets', () => {
    test('Should return 403 on add wallet without accessToken', async () => {
      await request(app)
        .post('/api/wallets')
        .send({
          name: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 204 on add wallet with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .post('/api/wallets')
        .set('x-access-token', accessToken)
        .send({
          name: faker.random.word()
        })
        .expect(204)
    })
  })

  describe('GET /wallets', () => {
    test('Should return 403 on load wallets without accessToken', async () => {
      await request(app)
        .get('/api/wallets')
        .expect(403)
    })

    test('Should return 200 on load wallets with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/wallets')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE /wallets', () => {
    test('Should return 403 on remove wallet without accessToken', async () => {
      await request(app)
        .delete('/api/wallets/any_id')
        .send()
        .expect(403)
    })

    test('Should return 204 on remove wallet with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const res = await walletCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const walletId = res.ops[0]._id

      await request(app)
        .delete(`/api/wallets/${walletId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })

    test('Should return 400 on remove wallet without walletId', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .delete(`/api/wallets/${FakeObjectId.generate()}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(400)
    })
  })

  describe('PUT /wallets', () => {
    test('Should return 403 on update wallet without accessToken', async () => {
      await request(app)
        .put('/api/wallets/any_id')
        .send({
          walletId: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 200 on update wallet with valid params', async () => {
      const { accessToken, id } = await mockAccessToken()
      const res = await walletCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const walletId = res.ops[0]._id

      await request(app)
        .put(`/api/wallets/${walletId}`)
        .set('x-access-token', accessToken)
        .send({ name: faker.random.word() })
        .expect(200)
    })

    test('Should return 400 on update wallet without walletId', async () => {
      const { accessToken } = await mockAccessToken()

      await request(app)
        .put(`/api/wallets/${FakeObjectId.generate()}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(400)
    })

    test('Should return 400 on update wallet without name', async () => {
      const { accessToken, id } = await mockAccessToken()
      const res = await walletCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const walletId = res.ops[0]._id

      await request(app)
        .put(`/api/wallets/${walletId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(400)
    })
  })
})
