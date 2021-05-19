import { AddBillRepository, AddManyBillsRepository, LoadCategoriesRepository, LoadWalletsRepository } from '@/data/protocols'
import { DbAddBill } from '@/data/usecases'
import { mockAddBillRepository, mockAddManyBillsRepository, mockLoadCategoriesRepository, mockLoadWalletsRepository } from '@/tests/data/mocks'
import { mockAddBillParams } from '@/tests/domain/mocks'
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
