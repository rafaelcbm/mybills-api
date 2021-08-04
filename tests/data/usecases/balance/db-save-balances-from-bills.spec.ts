import { AddBalanceRepository, LoadBalanceByMonthRepository, LoadFutureBalancesRepository, LoadLastBalanceRepository, UpdateBalanceRepository } from '@/data/protocols'
import { DbSaveBalancesFromBills } from '@/data/usecases'
import { AdjustBalance } from '@/domain/usecases'
import { getYearMonthFromDate } from '@/domain/util'
import { mockAddBalanceRepository, mockLoadBalanceByMonthRepository, mockLoadFutureBalancesRepository, mockLoadLastBalanceRepository, mockUpdateBalanceRepository } from '@/tests/data/mocks'
import { mockAdjustBalance } from '@/tests/domain/mocks/mock-balance'
import faker from 'faker'

type SutTypes = {
  sut: DbSaveBalancesFromBills
  addBalanceRepositoryStub: AddBalanceRepository
  updateBalanceRepositoryStub: UpdateBalanceRepository
  loadBalanceByMonthRepositoryStub: LoadBalanceByMonthRepository
  loadLastBalanceRepositoryStub: LoadLastBalanceRepository
  loadFutureBalancesRepositoryStub: LoadFutureBalancesRepository
  adjustBalanceStub: AdjustBalance
}

const makeSut = (): SutTypes => {
  const addBalanceRepositoryStub = mockAddBalanceRepository()
  const updateBalanceRepositoryStub = mockUpdateBalanceRepository()
  const loadBalanceByMonthRepositoryStub = mockLoadBalanceByMonthRepository()
  const loadLastBalanceRepositoryStub = mockLoadLastBalanceRepository()
  const loadFutureBalancesRepositoryStub = mockLoadFutureBalancesRepository()
  const adjustBalanceStub = mockAdjustBalance()

  const sut = new DbSaveBalancesFromBills(
    addBalanceRepositoryStub,
    updateBalanceRepositoryStub,
    loadBalanceByMonthRepositoryStub,
    loadLastBalanceRepositoryStub,
    loadFutureBalancesRepositoryStub,
    adjustBalanceStub
  )

  return {
    sut,
    addBalanceRepositoryStub,
    updateBalanceRepositoryStub,
    loadBalanceByMonthRepositoryStub,
    loadLastBalanceRepositoryStub,
    loadFutureBalancesRepositoryStub,
    adjustBalanceStub
  }
}

describe('DbSaveBalancesFromBills saveBalances', () => {
  test('should call correct dependencies when bill balance exists ', async () => {
    const {
      sut,
      loadBalanceByMonthRepositoryStub,
      adjustBalanceStub,
      updateBalanceRepositoryStub
    } = makeSut()

    const loadBalanceSpy = jest.spyOn(loadBalanceByMonthRepositoryStub, 'loadBalance')
    const adjustBalanceSpy = jest.spyOn(adjustBalanceStub, 'adjust')
    const updateBalanceRepositorySpy = jest.spyOn(updateBalanceRepositoryStub, 'update')

    const saveBalancesFromBillsParams = [{
      accountId: faker.random.word(),
      walletId: faker.random.word(),
      categoryId: faker.random.word(),
      description: faker.random.word(),
      date: faker.date.recent(),
      value: faker.random.number(),
      isDebt: true,
      isPaid: true,
      note: faker.random.word()
    }]
    await sut.saveBalances(saveBalancesFromBillsParams)

    expect(loadBalanceSpy).toHaveBeenCalledWith({ accountId: saveBalancesFromBillsParams[0].accountId, yearMonth: getYearMonthFromDate(saveBalancesFromBillsParams[0].date) })
    expect(adjustBalanceSpy).toHaveBeenCalled()
    expect(updateBalanceRepositorySpy).toHaveBeenCalled()
  })
})
