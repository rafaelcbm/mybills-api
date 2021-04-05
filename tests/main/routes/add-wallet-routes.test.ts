import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let walletCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
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
  return accessToken
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
          name: 'Wallet 1'
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/wallets')
        .set('x-access-token', accessToken)
        .send({
          name: 'Wallet 1'
        })
        .expect(204)
    })
  })
})
