import { LoadBalanceByMonthRepository, LoadBillByIdRepository, LoadFutureBalancesRepository, UpdateBalanceRepository } from '@/data/protocols'
import { DbSaveBalancesFromRemovedBill } from '@/data/usecases'
import { AdjustBalance } from '@/domain/usecases'
import { mockUpdateBalanceRepository, mockLoadBalanceByMonthRepository, mockLoadBillByIdRepository, mockLoadFutureBalancesRepository } from '@/tests/data/mocks'
import { mockAdjustBalance, mockBalanceModel } from '@/tests/domain/mocks/mock-balance'

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
      updateBalanceRepositoryStub,
      loadFutureBalancesRepositoryStub
    } = makeSut()

    const loadBillByIdRepositorySpy = jest.spyOn(loadBillByIdRepositoryStub, 'loadBillById')
    const loadBalanceByMonthSpy = jest.spyOn(loadBalanceByMonthRepositoryStub, 'loadBalance')
    const adjustBalanceSpy = jest.spyOn(adjustBalanceServiceStub, 'adjust')
    const updateBalanceRepositorySpy = jest.spyOn(updateBalanceRepositoryStub, 'update')
    const loadFutureBalancesRepositorySpy = jest.spyOn(loadFutureBalancesRepositoryStub, 'loadFutureBalances')
      .mockReturnValue(Promise.resolve([mockBalanceModel(), mockBalanceModel()]))

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
    expect(loadFutureBalancesRepositorySpy).toHaveBeenCalled()

    // One time for the bill balance and 2 more times for future balances
    expect(adjustBalanceSpy).toHaveBeenCalledTimes(3)
    expect(updateBalanceRepositorySpy).toHaveBeenCalledTimes(3)
  })
})
