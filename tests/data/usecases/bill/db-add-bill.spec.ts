import { AddBillRepository, AddManyBillsRepository, LoadCategoriesRepository, LoadWalletsRepository } from '@/data/protocols'
import { DbAddBill } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS, WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { BillPeriodicityModel, PeriodicityEnum } from '@/domain/models'
import { mockAddBillRepository, mockAddBillRepositoryResult, mockAddManyBillsRepository, mockLoadCategoriesRepository, mockLoadWalletsRepository } from '@/tests/data/mocks'
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
      const addManyBillsSpy = jest.spyOn(addManyBillsRepositoryStub, 'addMany')

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

  describe('DbAddBill checkCategory', () => {
    test('should check correct values ', async () => {
      const { sut , loadCategoriesRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadCategorySpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([mockCategoryModel(addBillParam.categoryId)]))

      await sut.checkCategory(addBillParam)

      expect(loadCategorySpy).toHaveBeenCalledWith(addBillParam.accountId)
    })

    test('should throw a GenericBusinessError if no category is found', async () => {
      const { sut , loadCategoriesRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadWalletSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([]))

      const promise = sut.checkCategory(addBillParam)

      await expect(promise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS))
      expect(loadWalletSpy).toHaveBeenCalledWith(addBillParam.accountId)
    })

    test('should throw a GenericBusinessError if no category is found with the same id', async () => {
      const { sut , loadCategoriesRepositoryStub } = makeSut()
      const addBillParam = mockAddBillParams()

      const loadWalletSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
        .mockReturnValueOnce(Promise.resolve([mockCategoryModel()]))

      const promise = sut.checkCategory(addBillParam)

      await expect(promise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS))
      expect(loadWalletSpy).toHaveBeenCalledWith(addBillParam.accountId)
    })
  })

  describe('DbAddBill generatePeriodicBills', () => {
    test('should generate periodic bills', async () => {
      const { sut } = makeSut()
      const baseBill = mockAddBillRepositoryResult()
      const accountId = faker.random.word()
      baseBill.periodicity.part = 1
      baseBill.periodicity.endPart = 3
      baseBill.periodicity.type = PeriodicityEnum.MONTH
      baseBill.periodicity.interval = 1

      jest.spyOn(sut, 'extractDate').mockReturnValueOnce(new Date())
      const periodicBills = sut.generatePeriodicBills(baseBill, accountId)

      expect(periodicBills.length).toBe(2)
      expect(periodicBills[0].accountId).toBe(accountId)
      expect(periodicBills[0].walletId).toBe(baseBill.walletId)
      expect(periodicBills[0].categoryId).toBe(baseBill.categoryId)
      expect(periodicBills[0].description).toBe(baseBill.description.concat(` 2 - ${baseBill.periodicity.endPart} `))
      expect(periodicBills[0].date).toBeTruthy()
      expect(periodicBills[0].value).toBe(baseBill.value)
      expect(periodicBills[0].isDebt).toBe(baseBill.isDebt)
      expect(periodicBills[0].note).toBe(baseBill.note)
      expect(periodicBills[0].periodicity.idReferenceBill).toBe(baseBill.id)
      expect(periodicBills[0].periodicity.type).toBe(baseBill.periodicity.type)
      expect(periodicBills[0].periodicity.interval).toBe(baseBill.periodicity.interval)
      expect(periodicBills[0].periodicity.part).toBe(2)
      expect(periodicBills[0].periodicity.endPart).toBe(baseBill.periodicity.endPart)
      expect(periodicBills[1].accountId).toBe(accountId)
      expect(periodicBills[1].walletId).toBe(baseBill.walletId)
      expect(periodicBills[1].categoryId).toBe(baseBill.categoryId)
      expect(periodicBills[1].description).toBe(baseBill.description.concat(` 3 - ${baseBill.periodicity.endPart} `))
      expect(periodicBills[1].date).toBeTruthy()
      expect(periodicBills[1].value).toBe(baseBill.value)
      expect(periodicBills[1].isDebt).toBe(baseBill.isDebt)
      expect(periodicBills[1].note).toBe(baseBill.note)
      expect(periodicBills[1].periodicity.idReferenceBill).toBe(baseBill.id)
      expect(periodicBills[1].periodicity.type).toBe(baseBill.periodicity.type)
      expect(periodicBills[1].periodicity.interval).toBe(baseBill.periodicity.interval)
      expect(periodicBills[1].periodicity.part).toBe(3)
      expect(periodicBills[1].periodicity.endPart).toBe(baseBill.periodicity.endPart)
    })
  })

  describe('DbAddBill extractDate', () => {
    test('should generate correct Date with periodicity in Days', async () => {
      const { sut } = makeSut()

      const date = new Date(2021, 10, 18)
      const baseBillPeriodicity: BillPeriodicityModel = {
        idReferenceBill: faker.random.word(),
        type: PeriodicityEnum.DAY,
        interval: 2,
        part: 2,
        endPart: 4
      }
      const part = 3

      const resultDate = sut.extractDate(date, baseBillPeriodicity, part)

      expect(resultDate).toEqual(new Date(2021, 10, 20))
    })

    test('should generate correct Date with periodicity in Weeks', async () => {
      const { sut } = makeSut()

      const date = new Date(2021, 2, 10)
      const baseBillPeriodicity: BillPeriodicityModel = {
        idReferenceBill: faker.random.word(),
        type: PeriodicityEnum.WEEK,
        interval: 1,
        part: 1,
        endPart: 4
      }
      const part = 3

      const resultDate = sut.extractDate(date, baseBillPeriodicity, part)

      expect(resultDate).toEqual(new Date(2021, 2, 24))
    })

    test('should generate correct Date with periodicity in Months', async () => {
      const { sut } = makeSut()

      const date = new Date(2021, 10, 15)
      const baseBillPeriodicity: BillPeriodicityModel = {
        idReferenceBill: faker.random.word(),
        type: PeriodicityEnum.MONTH,
        interval: 2,
        part: 2,
        endPart: 4
      }
      const part = 4

      const resultDate = sut.extractDate(date, baseBillPeriodicity, part)

      expect(resultDate).toEqual(new Date(2022, 2, 15))
    })

    test('should generate correct Date with periodicity in Years', async () => {
      const { sut } = makeSut()

      const date = new Date(2021, 10, 15)
      const baseBillPeriodicity: BillPeriodicityModel = {
        idReferenceBill: faker.random.word(),
        type: PeriodicityEnum.YEAR,
        interval: 5,
        part: 3,
        endPart: 4
      }
      const part = 5

      const resultDate = sut.extractDate(date, baseBillPeriodicity, part)

      expect(resultDate).toEqual(new Date(2031, 10, 15))
    })
  })
})
