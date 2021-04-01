import { MongoHelper, WalletMongoRepository } from '@/infra/db'
import { mockAddWalletRepositoryParams } from '@/tests/data/mocks'
import { Collection } from 'mongodb'

const makeSut = (): WalletMongoRepository => {
  return new WalletMongoRepository()
}

let walletCollection: Collection

describe('WalletMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a wallet on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddWalletRepositoryParams())
      const count = await walletCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
