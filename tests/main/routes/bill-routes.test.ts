import { PeriodicityEnum } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'
import faker from 'faker'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let walletCollection: Collection
let categoryCollection: Collection
let billCollection: Collection
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

describe('Bill Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.deleteMany({})
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
    billCollection = await MongoHelper.getCollection('bills')
    await billCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /bills', () => {
    test('Should return 403 on add bill without accessToken', async () => {
      await request(app)
        .post('/api/bills')
        .send({
          name: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 204 on add bill with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()

      const resWallet = await walletCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const walletId = resWallet.ops[0]._id

      const resCategory = await categoryCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const categoryId = resCategory.ops[0]._id

      await request(app)
        .post('/api/bills')
        .set('x-access-token', accessToken)
        .send({
          accountId: id,
          walletId: walletId,
          categoryId: categoryId,
          description: 'any_description',
          date: new Date(),
          value: 100,
          isDebt: true,
          note: 'any_note',
          periodicity: {
            idReferenceBill: null,
            type: PeriodicityEnum.MONTH,
            interval: 1,
            part: 1,
            endPart: 3
          }
        })
        .expect(204)
    })

    test('Should return 400 on add bill with an invalid wallet id', async () => {
      const { accessToken, id } = await mockAccessToken()

      const resCategory = await categoryCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const categoryId = resCategory.ops[0]._id

      await request(app)
        .post('/api/bills')
        .set('x-access-token', accessToken)
        .send({
          accountId: id,
          walletId: 'invalid_wallet_id',
          categoryId: categoryId,
          description: 'any_description',
          date: new Date(),
          value: 100,
          isDebt: true,
          note: 'any_note',
          periodicity: {
            idReferenceBill: null,
            type: PeriodicityEnum.MONTH,
            interval: 1,
            part: 1,
            endPart: 3
          }
        })
        .expect(400)
    })

    test('Should return 400 on add bill with an invalid category id', async () => {
      const { accessToken, id } = await mockAccessToken()

      const resWallet = await walletCollection.insertOne({
        name: faker.random.word(),
        accountId: id
      })
      const walletId = resWallet.ops[0]._id

      await request(app)
        .post('/api/bills')
        .set('x-access-token', accessToken)
        .send({
          accountId: id,
          walletId: walletId,
          categoryId: 'invalid_category_id',
          description: 'any_description',
          date: new Date(),
          value: 100,
          isDebt: true,
          note: 'any_note',
          periodicity: {
            idReferenceBill: null,
            type: PeriodicityEnum.MONTH,
            interval: 1,
            part: 1,
            endPart: 3
          }
        })
        .expect(400)
    })
  })
})
