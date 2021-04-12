import { LoadWalletsRepository } from '@/data/protocols'
import { mockLoadWalletsRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'
import { DbLoadWallets } from '@/data/usecases'

type SutTypes = {
  sut: DbLoadWallets
  loadWalletRepositoryStub: LoadWalletsRepository
}

const makeSut = (): SutTypes => {
  const loadWalletRepositoryStub = mockLoadWalletsRepository()
  const sut = new DbLoadWallets(loadWalletRepositoryStub)
  return {
    sut,
    loadWalletRepositoryStub
  }
}

describe('DbLoadWallets Usecase', () => {
  test('should call LoadWalletRepository with correct values ', async () => {
    const { sut, loadWalletRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadWalletRepositoryStub, 'loadAll')
    const accountId = faker.random.word()
    await sut.loadAll(accountId)

    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should throw if LoadWalletRepository throws', async () => {
    const { sut, loadWalletRepositoryStub } = makeSut()
    jest.spyOn(loadWalletRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll(faker.random.word())
    await expect(promise).rejects.toThrow()
  })
})
