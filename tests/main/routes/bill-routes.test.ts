import { PeriodicityEnum } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'
import faker from 'faker'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import FakeObjectId from 'bson-objectid'

let walletCollection: Collection
let categoryCollection: Collection
let billCollection: Collection
let accountCollection: Collection
let balanceCollection: Collection

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
    balanceCollection = await MongoHelper.getCollection('balances')
    await balanceCollection.deleteMany({})
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
          isPaid: true,
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
          isPaid: true,
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
          isPaid: true,
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

  describe('GET /bills/month/:month', () => {
    test('Should return 403 on load bills without accessToken', async () => {
      await request(app)
        .get('/api/bills/month/2021-05')
        .expect(403)
    })

    test('Should return 200 on load bills with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/bills/month/2021-05')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on load bills with data', async () => {
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

      const resBill = await billCollection.insertOne({
        accountId: id,
        walletId: walletId,
        categoryId: categoryId,
        description: 'any_description',
        date: new Date(2021, 4, 10),// Month zero based
        value: 100,
        isDebt: true,
        isPaid: true,
        note: 'any_note',
        periodicity: {
          idReferenceBill: null,
          type: PeriodicityEnum.MONTH,
          interval: 1,
          part: 1,
          endPart: 3
        }
      })

      const insertedBill = resBill.ops[0]
      expect(insertedBill).toBeTruthy()

      const response = await request(app)
        .get('/api/bills/month/2021-05')
        .set('x-access-token', accessToken)
        .expect(200)

      expect(response.body.length).toBe(1)
      expect(response.body[0].accountId).toBeUndefined()
      expect(response.body[0].walletId).toEqual(walletId.toString())
      expect(response.body[0].categoryId).toEqual(categoryId.toString())
      expect(response.body[0].description).toEqual('any_description')
      expect(new Date(response.body[0].date)).toEqual(insertedBill.date)
      expect(response.body[0].value).toBe(100)
      expect(response.body[0].isDebt).toBe(true)
      expect(response.body[0].isPaid).toBe(true)
      expect(response.body[0].note).toBe('any_note')
      expect(response.body[0].periodicity).toEqual(insertedBill.periodicity)
    })
  })

  describe('DELETE /bills', () => {
    test('Should return 403 on remove bill without accessToken', async () => {
      await request(app)
        .delete('/api/bills/any_id')
        .send()
        .expect(403)
    })

    test('Should return 204 on remove bill with valid accessToken', async () => {
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

      const resBalance = await balanceCollection.insertOne({
        accountId: id,
        yearMonth: '2021-05',
        balance: 123.45
      })

      const insertedBalance = resBalance.ops[0]
      expect(insertedBalance).toBeTruthy()

      const resBill = await billCollection.insertOne({
        accountId: id,
        walletId: walletId,
        categoryId: categoryId,
        description: 'any_description',
        date: new Date(2021, 4, 21),
        value: 100,
        isDebt: true,
        isPaid: true,
        note: 'any_note',
        periodicity: {
          idReferenceBill: null,
          type: PeriodicityEnum.MONTH,
          interval: 1,
          part: 1,
          endPart: 3
        }
      })

      const billId = resBill.ops[0]._id

      await request(app)
        .delete(`/api/bills/${billId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })

    test('Should return 400 on remove bill without billId', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .delete(`/api/bills/${FakeObjectId.generate()}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(400)
    })
  })
})
