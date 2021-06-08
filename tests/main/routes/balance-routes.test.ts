import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let balanceCollection: Collection
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

describe('Balance Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    balanceCollection = await MongoHelper.getCollection('balances')
    await balanceCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /balance/month/:month', () => {
    test('Should return 403 on load balances without accessToken', async () => {
      await request(app)
        .get('/api/balance/month/2021-05')
        .expect(403)
    })

    test('Should return 200 on load balances with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/balance/month/2021-05')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on load balances with data', async () => {
      const { accessToken, id } = await mockAccessToken()

      const resBalance = await balanceCollection.insertOne({
        accountId: id,
        yearMonth: '2021-05',
        balance: 123.45
      })

      const insertedBalance = resBalance.ops[0]
      expect(insertedBalance).toBeTruthy()

      const response = await request(app)
        .get('/api/balance/month/2021-05')
        .set('x-access-token', accessToken)
        .expect(200)

      expect(response.body.accountId).toBeUndefined()
      expect(response.body.id).toBeTruthy()
      expect(response.body.yearMonth).toEqual('2021-05')
      expect(response.body.balance).toEqual(123.45)
    })
  })
})
