import { MongoHelper, WalletMongoRepository } from '@/infra/db'
import { mockAddWalletRepositoryParams } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

let walletCollection: Collection
let accountCollection: Collection

const makeSut = (): WalletMongoRepository => {
  return new WalletMongoRepository()
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a wallet on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddWalletRepositoryParams())
      const count = await walletCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all wallets on success', async () => {
      const accountId = await mockAccountId()
      const walletsParams = [
        Object.assign({} , mockAddWalletRepositoryParams(), { accountId }),
        Object.assign({} , mockAddWalletRepositoryParams(), { accountId })]
      await walletCollection.insertMany(walletsParams)
      const sut = makeSut()
      const wallets = await sut.loadAll(accountId)
      expect(wallets.length).toBe(2)
      expect(wallets[0].accountId).toBeTruthy()
      expect(wallets[0].accountId).toEqual(accountId)
      expect(wallets[0].name).toBeTruthy()
      expect(wallets[1].accountId).toBeTruthy()
      expect(wallets[1].accountId).toEqual(accountId)
      expect(wallets[1].name).toBeTruthy()
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const wallets = await sut.loadAll(accountId)
      expect(wallets.length).toBe(0)
    })
  })
})
