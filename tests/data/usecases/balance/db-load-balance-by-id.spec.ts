import { LoadBalanceByIdRepository } from '@/data/protocols'
import { DbLoadBalanceById } from '@/data/usecases'
import { LoadBalanceByIdParams } from '@/domain/usecases'
import { mockLoadBalanceByIdRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadBalanceById
  loadBalanceByIdRepositoryStub: LoadBalanceByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBalanceByIdRepositoryStub = mockLoadBalanceByIdRepository()
  const sut = new DbLoadBalanceById(loadBalanceByIdRepositoryStub)
  return {
    sut,
    loadBalanceByIdRepositoryStub
  }
}

describe('DbLoadBalanceById Usecase', () => {
  test('should call LoadBalanceByIdRepository with correct values ', async () => {
    const { sut, loadBalanceByIdRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadBalanceByIdRepositoryStub, 'loadBalanceById')

    const loadBalanceByIdParams: LoadBalanceByIdParams = {
      accountId: faker.random.word(),
      id: faker.random.word()
    }
    await sut.loadBalance(loadBalanceByIdParams)

    expect(loadAllSpy).toHaveBeenCalledWith(loadBalanceByIdParams)
  })

  test('Should throw if LoadBalanceByIdRepository throws', async () => {
    const { sut, loadBalanceByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBalanceByIdRepositoryStub, 'loadBalanceById').mockImplementationOnce(throwError)
    const loadBalanceByIdParams: LoadBalanceByIdParams = {
      accountId: faker.random.word(),
      id: faker.random.word()
    }

    const promise = sut.loadBalance(loadBalanceByIdParams)
    await expect(promise).rejects.toThrow()
  })
})
