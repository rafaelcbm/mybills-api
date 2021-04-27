import { LoadCategoriesRepository, RemoveCategoryRepository } from '@/data/protocols'
import { LoadChildCategoriesRepository } from '@/data/protocols/db/category/load-child-categories-repository'
import { RemoveChildCategoriesRepository } from '@/data/protocols/db/category/remove-child-categories-repository'
import { DbRemoveCategory } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { mockLoadCategoriesRepository, mockLoadChildCategoriesRepository, mockRemoveCategoryRepository, mockRemoveChildCategoriesRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbRemoveCategory
  removeCategoryRepositoryStub: RemoveCategoryRepository
  removeChildCategoriesRepositoryStub: RemoveChildCategoriesRepository
  loadCategoriesRepositoryStub: LoadCategoriesRepository
  loadChildCategoriesRepositoryStub: LoadChildCategoriesRepository
}

const categoryId = faker.random.word()

const makeSut = (): SutTypes => {
  const removeCategoryRepositoryStub = mockRemoveCategoryRepository()
  const removeChildCategoriesRepositoryStub = mockRemoveChildCategoriesRepository()
  const loadCategoriesRepositoryStub = mockLoadCategoriesRepository(categoryId)
  const loadChildCategoriesRepositoryStub = mockLoadChildCategoriesRepository()
  const sut = new DbRemoveCategory(
    removeCategoryRepositoryStub,
    removeChildCategoriesRepositoryStub,
    loadCategoriesRepositoryStub,
    loadChildCategoriesRepositoryStub
  )
  return {
    sut,
    removeCategoryRepositoryStub,
    removeChildCategoriesRepositoryStub,
    loadCategoriesRepositoryStub,
    loadChildCategoriesRepositoryStub
  }
}

describe('DbRemoveCategory Usecase', () => {
  test('should call RemoveCategoryRepository with correct values ', async () => {
    const { sut, removeCategoryRepositoryStub } = makeSut()
    const removeSpy = jest.spyOn(removeCategoryRepositoryStub, 'remove')
    const accountId = faker.random.word()
    await sut.remove(accountId, categoryId)
    expect(removeSpy).toHaveBeenCalledWith(accountId, categoryId)
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const accountId = faker.random.word()
    const promise = sut.remove(accountId, categoryId)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadChildCategoriesRepository throws', async () => {
    const { sut, loadChildCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadChildCategoriesRepositoryStub, 'loadChild').mockImplementationOnce(throwError)
    const accountId = faker.random.word()
    const promise = sut.remove(accountId, categoryId)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if RemoveCategoryRepository throws', async () => {
    const { sut, removeCategoryRepositoryStub } = makeSut()
    jest.spyOn(removeCategoryRepositoryStub, 'remove').mockImplementationOnce(throwError)
    const accountId = faker.random.word()
    const promise = sut.remove(accountId, categoryId)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if RemoveChildCategoriesRepository throws', async () => {
    const { sut, removeChildCategoriesRepositoryStub } = makeSut()
    jest.spyOn(removeChildCategoriesRepositoryStub, 'removeChildCategories').mockImplementationOnce(throwError)
    const accountId = faker.random.word()
    const promise = sut.remove(accountId, categoryId)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw a specific BadRequestError if can not remove category', async () => {
    const { sut, removeCategoryRepositoryStub } = makeSut()
    jest.spyOn(removeCategoryRepositoryStub, 'remove').mockReturnValueOnce(Promise.resolve(null))
    const accountId = faker.random.word()
    const expectedErrorPromise = sut.remove(accountId, categoryId)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NOT_FOUND))
  })

  test('Should throw a specific BadRequestError if category was not found', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const accountId = faker.random.word()
    const expectedErrorPromise = sut.remove(accountId, categoryId)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NOT_FOUND))
  })
})
