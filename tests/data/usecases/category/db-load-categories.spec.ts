import { LoadCategoriesRepository } from '@/data/protocols'
import { mockLoadCategoriesRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'
import { DbLoadCategories } from '@/data/usecases'

type SutTypes = {
  sut: DbLoadCategories
  loadCategoryRepositoryStub: LoadCategoriesRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryRepositoryStub = mockLoadCategoriesRepository()
  const sut = new DbLoadCategories(loadCategoryRepositoryStub)
  return {
    sut,
    loadCategoryRepositoryStub
  }
}

describe('DbLoadCategories Usecase', () => {
  test('should call LoadCategoryRepository with correct values ', async () => {
    const { sut, loadCategoryRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCategoryRepositoryStub, 'loadAll')
    const accountId = faker.random.word()
    await sut.loadAll(accountId)

    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should throw if LoadCategoryRepository throws', async () => {
    const { sut, loadCategoryRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll(faker.random.word())
    await expect(promise).rejects.toThrow()
  })
})
