import { LoadBalanceByMonthRepository } from '@/data/protocols'
import { DbLoadBalanceByMonth } from '@/data/usecases'
import { LoadBalanceByMonthParams } from '@/domain/usecases'
import { mockLoadBalanceByMonthRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadBalanceByMonth
  loadBalanceByMonthRepositoryStub: LoadBalanceByMonthRepository
}

const makeSut = (): SutTypes => {
  const loadBalanceByMonthRepositoryStub = mockLoadBalanceByMonthRepository()
  const sut = new DbLoadBalanceByMonth(loadBalanceByMonthRepositoryStub)
  return {
    sut,
    loadBalanceByMonthRepositoryStub
  }
}

describe('DbLoadBalanceByMonth Usecase', () => {
  test('should call LoadBalanceByMonthRepository with correct values ', async () => {
    const { sut, loadBalanceByMonthRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadBalanceByMonthRepositoryStub, 'loadBalance')

    const loadBalanceByMonthParams: LoadBalanceByMonthParams = {
      accountId: faker.random.word(),
      yearMonth: faker.random.word()
    }
    await sut.loadBalance(loadBalanceByMonthParams)

    expect(loadAllSpy).toHaveBeenCalledWith(loadBalanceByMonthParams)
  })

  test('Should throw if LoadBalanceByMonthRepository throws', async () => {
    const { sut, loadBalanceByMonthRepositoryStub } = makeSut()
    jest.spyOn(loadBalanceByMonthRepositoryStub, 'loadBalance').mockImplementationOnce(throwError)
    const loadBalanceByMonthParams: LoadBalanceByMonthParams = {
      accountId: faker.random.word(),
      yearMonth: faker.random.word()
    }

    const promise = sut.loadBalance(loadBalanceByMonthParams)
    await expect(promise).rejects.toThrow()
  })
})
