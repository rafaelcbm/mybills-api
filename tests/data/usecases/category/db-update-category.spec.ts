import { LoadCategoriesRepository, UpdateCategoryRepository } from '@/data/protocols'
import { DbUpdateCategory } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS, CATEGORY_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { mockLoadCategoriesRepository, mockUpdateCategoryRepository, mockUpdateCategoryRepositoryParams, mockLoadCategoryRepositoryResult } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositoryStub: UpdateCategoryRepository
  loadCategoriesRepositoryStub: LoadCategoriesRepository
}

const accountId = faker.random.word()
const categoryId = faker.random.word()

const makeSut = (): SutTypes => {
  const updateCategoryRepositoryStub = mockUpdateCategoryRepository()
  const loadCategoriesRepositoryStub = mockLoadCategoriesRepository(categoryId)
  const sut = new DbUpdateCategory(
    updateCategoryRepositoryStub,
    loadCategoriesRepositoryStub)
  return {
    sut,
    updateCategoryRepositoryStub,
    loadCategoriesRepositoryStub
  }
}

describe('DbUpdateCategory Usecase', () => {
  test('should call UpdateCategoryRepository with correct values ', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCategoryRepositoryStub, 'update')
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    await sut.update(updateCategoryParam)
    expect(updateSpy).toHaveBeenCalledWith(updateCategoryParam)
  })

  test('should return a valid category if UpdateCategoryRepository returns', async () => {
    const { sut } = makeSut()
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    const updatedCategory = await sut.update(updateCategoryParam)
    expect(updatedCategory).toBeTruthy()
    expect(updatedCategory.id).toBeTruthy()
    expect(updatedCategory.name).toBeTruthy()
    expect(updatedCategory.root).toBeTruthy()
    expect(updatedCategory.accountId).toBeTruthy()
    expect(updatedCategory.ancestors).toBeTruthy()
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const updateCategoryParam = mockUpdateCategoryRepositoryParams()
    const promise = sut.update(updateCategoryParam)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut()
    jest.spyOn(updateCategoryRepositoryStub, 'update').mockImplementationOnce(throwError)
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    const promise = sut.update(updateCategoryParam)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw a specific BadRequestError if can not update category', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut()
    jest.spyOn(updateCategoryRepositoryStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    const expectedErrorPromise = sut.update(updateCategoryParam)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NOT_FOUND))
  })

  test('Should throw a specific BadRequestError if a category with the provided id is not found', async () => {
    const { sut } = makeSut()
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId)
    const expectedErrorPromise = sut.update(updateCategoryParam)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NOT_FOUND))
  })

  test('Should throw a specific BadRequestError if category name already exists', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const sameCategoryName = 'same-name'
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockReturnValueOnce(
      Promise.resolve(mockLoadCategoryRepositoryResult(categoryId, sameCategoryName)))
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    updateCategoryParam.name = sameCategoryName
    const expectedErrorPromise = sut.update(updateCategoryParam)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS))
  })

  test('Should throw a specific BadRequestError UpdateCategoryRepository return falsy value', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut()
    jest.spyOn(updateCategoryRepositoryStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const updateCategoryParam = mockUpdateCategoryRepositoryParams(accountId, categoryId)
    const promise = sut.update(updateCategoryParam)
    await expect(promise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NOT_FOUND))
  })
})
