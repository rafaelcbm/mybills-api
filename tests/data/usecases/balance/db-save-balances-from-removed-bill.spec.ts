import { LoadBalanceByMonthRepository, LoadBillByIdRepository, LoadFutureBalancesRepository, UpdateBalanceRepository } from '@/data/protocols'
import { DbSaveBalancesFromRemovedBill } from '@/data/usecases'
import { AdjustBalance } from '@/domain/usecases'
import { getYearMonthFromDate } from '@/domain/util'
import { mockUpdateBalanceRepository, mockLoadBalanceByMonthRepository, mockLoadBillByIdRepository, mockLoadFutureBalancesRepository, mockLoadLastBalanceRepository } from '@/tests/data/mocks'
import { mockAdjustBalance } from '@/tests/domain/mocks/mock-balance'
import faker from 'faker'

type SutTypes = {
  sut: DbSaveBalancesFromRemovedBill
  loadBillByIdRepositoryStub: LoadBillByIdRepository
  loadBalanceByMonthRepositoryStub: LoadBalanceByMonthRepository
  adjustBalanceServiceStub: AdjustBalance
  updateBalanceRepositoryStub: UpdateBalanceRepository
  loadFutureBalancesRepositoryStub: LoadFutureBalancesRepository
}

const makeSut = (): SutTypes => {
  const loadBillByIdRepositoryStub = mockLoadBillByIdRepository()
  const loadBalanceByMonthRepositoryStub = mockLoadBalanceByMonthRepository()
  const adjustBalanceServiceStub = mockAdjustBalance()
  const updateBalanceRepositoryStub = mockUpdateBalanceRepository()
  const loadFutureBalancesRepositoryStub = mockLoadFutureBalancesRepository()

  const sut = new DbSaveBalancesFromRemovedBill(
    loadBillByIdRepositoryStub,
    loadBalanceByMonthRepositoryStub,
    adjustBalanceServiceStub,
    updateBalanceRepositoryStub,
    loadFutureBalancesRepositoryStub
  )

  return {
    sut,
    loadBillByIdRepositoryStub,
    loadBalanceByMonthRepositoryStub,
    adjustBalanceServiceStub,
    updateBalanceRepositoryStub,
    loadFutureBalancesRepositoryStub
  }
}

describe('DbSaveBalancesFromRemovedBill saveBalances', () => {
  test('should call correct dependencies ', async () => {
    const {
      sut,
      loadBillByIdRepositoryStub,
      loadBalanceByMonthRepositoryStub,
      adjustBalanceServiceStub,
      updateBalanceRepositoryStub
    } = makeSut()

    const loadBillByIdRepositorySpy = jest.spyOn(loadBillByIdRepositoryStub, 'loadBillById')
    const loadBalanceByMonthSpy = jest.spyOn(loadBalanceByMonthRepositoryStub, 'loadBalance')
    const adjustBalanceSpy = jest.spyOn(adjustBalanceServiceStub, 'adjust')
    const updateBalanceRepositorySpy = jest.spyOn(updateBalanceRepositoryStub, 'update')

    const saveBalancesFromRemovedBillParams = {
      accountId: faker.random.word(),
      billId: faker.random.word()
    }

    await sut.saveBalances(saveBalancesFromRemovedBillParams)

    expect(loadBillByIdRepositorySpy).toHaveBeenCalledWith(
      {
        accountId: saveBalancesFromRemovedBillParams.accountId,
        id: saveBalancesFromRemovedBillParams.billId
      }
    )

    expect(loadBalanceByMonthSpy).toHaveBeenCalled()
    expect(adjustBalanceSpy).toHaveBeenCalled()
    expect(updateBalanceRepositorySpy).toHaveBeenCalled()
  })
})
