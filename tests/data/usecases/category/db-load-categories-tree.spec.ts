import { LoadChildCategoriesRepository, LoadRootCategoriesRepository } from '@/data/protocols'
import { DbLoadCategoriesTree } from '@/data/usecases'
import { mockLoadChildCategoriesRepository, mockLoadRootCategoriesRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadCategoriesTree
  loadRootCategoriesRepository: LoadRootCategoriesRepository
  loadChildCategoriesRepository: LoadChildCategoriesRepository
}

const accountId = faker.random.word()
const root = faker.random.word()

const makeSut = (): SutTypes => {
  const loadRootCategoriesRepository = mockLoadRootCategoriesRepository(accountId, root)
  const loadChildCategoriesRepository = mockLoadChildCategoriesRepository(accountId, root)
  const sut = new DbLoadCategoriesTree(loadRootCategoriesRepository,loadChildCategoriesRepository)
  return {
    sut,
    loadRootCategoriesRepository,
    loadChildCategoriesRepository
  }
}

describe('LoadCategoriesTree Usecase', () => {
  test('should call LoadRootCategoriesRepository with correct values ', async () => {
    const { sut, loadRootCategoriesRepository,loadChildCategoriesRepository } = makeSut()
    const loadRootsSpy = jest.spyOn(loadRootCategoriesRepository, 'loadRoots')
    jest.spyOn(loadChildCategoriesRepository, 'loadChild').mockReturnValueOnce(Promise.resolve([]))
    await sut.load(accountId)

    expect(loadRootsSpy).toHaveBeenCalledWith(accountId)
  })

  test('should return empty array if LoadRootCategoriesRepository returns an empty array ', async () => {
    const { sut, loadRootCategoriesRepository } = makeSut()
    jest.spyOn(loadRootCategoriesRepository, 'loadRoots').mockReturnValueOnce(Promise.resolve([]))

    const result = await sut.load(accountId)

    expect(result).toEqual([])
  })

  test('should call LoadChildCategoriesRepository with correct values ', async () => {
    const { sut, loadChildCategoriesRepository } = makeSut()

    const loadChilds = jest.spyOn(loadChildCategoriesRepository, 'loadChild').mockReturnValueOnce(Promise.resolve([]))
    await sut.load(accountId)

    expect(loadChilds).toHaveBeenCalledWith(accountId, root)
  })

  test('should call LoadChildCategoriesRepository with correct values ', async () => {
    const { sut, loadChildCategoriesRepository } = makeSut()

    const loadChilds = jest.spyOn(loadChildCategoriesRepository, 'loadChild').mockReturnValueOnce(Promise.resolve([]))
    await sut.load(accountId)

    expect(loadChilds).toHaveBeenCalledWith(accountId, root)
  })

  test('Should throw if LoadRootCategoriesRepository throws', async () => {
    const { sut, loadRootCategoriesRepository } = makeSut()
    jest.spyOn(loadRootCategoriesRepository, 'loadRoots').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.word())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadChildCategoriesRepository throws', async () => {
    const { sut, loadChildCategoriesRepository } = makeSut()
    jest.spyOn(loadChildCategoriesRepository, 'loadChild').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.word())
    await expect(promise).rejects.toThrow()
  })

  // test('Should throw if LoadCategoryRepository throws', async () => {
  //   const { sut, loadRootCategoriesRepository: loadCategoryRepositoryStub } = makeSut()
  //   jest.spyOn(loadCategoryRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
  //   const promise = sut.loadAll(faker.random.word())
  //   await expect(promise).rejects.toThrow()
  // })
})
