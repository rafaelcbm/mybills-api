import { AddCategoryRepository, LoadCategoriesRepository } from '@/data/protocols'
import { DbAddCategory } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS } from '@/domain/errors/messages/error-messages'
import { mockAddCategoryRepository, mockLoadCategoriesRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import { mockAddCategoryParams } from '@/tests/domain/mocks/mock-category'
import faker from 'faker'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositoryStub: AddCategoryRepository
  loadCategoriesRepositoryStub: LoadCategoriesRepository
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = mockAddCategoryRepository()
  const loadCategoriesRepositoryStub = mockLoadCategoriesRepository()
  const sut = new DbAddCategory(addCategoryRepositoryStub, loadCategoriesRepositoryStub)
  return {
    sut,
    addCategoryRepositoryStub,
    loadCategoriesRepositoryStub
  }
}

describe('DbAddCategory Usecase', () => {
  test('should call LoadCategoriesRepository with correct values ', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
    const addCategoryParam = mockAddCategoryParams()
    await sut.add(addCategoryParam)

    expect(loadSpy).toHaveBeenCalledWith(addCategoryParam.accountId)
  })

  test('should call AddCategoryRepository with correct values ', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    const addCategoryParam = mockAddCategoryParams()
    await sut.add(addCategoryParam)

    expect(addSpy).toHaveBeenCalledWith(addCategoryParam)
  })

  test('Should throw a GenericBusinessError if the category name already exists', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const newCategory = mockAddCategoryParams()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockReturnValueOnce(
      Promise.resolve([Object.assign({},newCategory, { id: faker.random.word() })]))
    const promise = sut.add(newCategory)
    await expect(promise).rejects.toThrowError(new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS))
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
