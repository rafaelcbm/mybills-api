import { AddBillRepository, AddManyBillsRepository, LoadCategoriesRepository, LoadWalletsRepository } from '@/data/protocols'
import { DbAddBill } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS, WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { AddBillParams } from '@/domain/usecases'
import { mockAddBillRepository, mockAddManyBillsRepository, mockLoadCategoriesRepository, mockLoadWalletsRepository } from '@/tests/data/mocks'
import { mockAddBillParams, mockCategoryModel, mockWalletModel } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbAddBill
  loadWalletRepositoryStub: LoadWalletsRepository
  loadCategoriesRepositoryStub: LoadCategoriesRepository
  addBillRepositoryStub: AddBillRepository
  addManyBillsRepositoryStub: AddManyBillsRepository
}

const makeSut = (): SutTypes => {
  const loadWalletRepositoryStub = mockLoadWalletsRepository()
  const loadCategoriesRepositoryStub = mockLoadCategoriesRepository()
  const addBillRepositoryStub = mockAddBillRepository()
  const addManyBillsRepositoryStub = mockAddManyBillsRepository()

  const sut = new DbAddBill(
    loadWalletRepositoryStub,
    loadCategoriesRepositoryStub,
    addBillRepositoryStub,
    addManyBillsRepositoryStub
  )

  return {
    sut,
    loadWalletRepositoryStub,
    loadCategoriesRepositoryStub,
    addBillRepositoryStub,
    addManyBillsRepositoryStub
  }
}

describe('DbAddBill ', () => {
  describe('DbAddBill add', () => {
    test('should call AddBillRepository with correct values ', async () => {
      const { sut , addBillRepositoryStub } = makeSut()
      jest.spyOn(sut, 'checkWallet').mockReturnValueOnce(Promise.resolve())
      jest.spyOn(sut, 'checkCategory').mockReturnValueOnce(Promise.resolve())
      const addSpy = jest.spyOn(addBillRepositoryStub, 'add')

      const addBillParam = {
        accountId: faker.random.word(),
        walletId: faker.random.word(),
        categoryId: faker.random.word(),
        description: faker.random.word(),
        date: faker.date.past(5),
        value: faker.random.number(),
        isDebt: faker.random.boolean(),
        note: faker.random.words()

      }

      await sut.add(addBillParam)

      expect(addSpy).toHaveBeenCalledWith(addBillParam)
    })

    test('should call AddManyBillsRepository with correct values ', async () => {
      const { sut , addBillRepositoryStub, addManyBillsRepositoryStub } = makeSut()
      jest.spyOn(sut, 'checkWallet').mockReturnValueOnce(Promise.resolve())
      jest.spyOn(sut, 'checkCategory').mockReturnValueOnce(Promise.resolve())
      jest.spyOn(addBillRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
      const periodicBillsFake = [mockAddBillParams(), mockAddBillParams()]
      jest.spyOn(sut, 'generatePeriodicBills').mockReturnValueOnce(periodicBillsFake)
      const addManyBillsSpy = jest.spyOn(addManyBillsRepositoryStub, 'add')

      const addBillParam = mockAddBillParams()

      await sut.add(addBillParam)

      expect(addManyBillsSpy).toHaveBeenCalledWith(periodicBillsFake)
    })
  })

  describe('DbAddBill checkWallet', () => {
    test('should check correct values ', async () => {
      const { sut , loadWalletRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadWalletSpy = jest.spyOn(loadWalletRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([mockWalletModel(addBillParam.walletId)]))

      await sut.checkWallet(addBillParam)

      expect(loadWalletSpy).toHaveBeenCalledWith(addBillParam.accountId)
    })

    test('should throw a GenericBusinessError if no wallet is found', async () => {
      const { sut , loadWalletRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadWalletSpy = jest.spyOn(loadWalletRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([]))

      const promise = sut.checkWallet(addBillParam)

      await expect(promise).rejects.toThrowError(new GenericBusinessError(WALLET_NOT_FOUND))
      expect(loadWalletSpy).toHaveBeenCalledWith(addBillParam.accountId)
    })

    test('should throw a GenericBusinessError if no wallet is found with the same id', async () => {
      const { sut , loadWalletRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadWalletSpy = jest.spyOn(loadWalletRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([mockWalletModel()]))

      const promise = sut.checkWallet(addBillParam)

      await expect(promise).rejects.toThrowError(new GenericBusinessError(WALLET_NOT_FOUND))
      expect(loadWalletSpy).toHaveBeenCalledWith(addBillParam.accountId)
    })
  })
})
