import { LoadChildCategoriesRepository, LoadRootCategoriesRepository } from '@/data/protocols'
import { DbLoadCategoriesTree } from '@/data/usecases'
import { mockLoadChildCategoriesRepository, mockLoadChildCategoriesRepositoryResult, mockLoadRootCategoriesRepository, mockLoadRootCategoriesRepositoryResult } from '@/tests/data/mocks'
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

  test('should return categories with its children ', async () => {
    const { sut, loadChildCategoriesRepository } = makeSut()

    jest.spyOn(loadChildCategoriesRepository, 'loadChild')
      .mockReturnValueOnce(Promise.resolve(mockLoadChildCategoriesRepositoryResult(accountId, root)))
      .mockReturnValue(Promise.resolve([]))
    const categoriesTree = await sut.load(accountId)

    expect(categoriesTree.length).toBe(1)
    expect(categoriesTree[0].name).toBe(root)
    expect(categoriesTree[0].root).toBeNull()
    expect(categoriesTree[0].id).toBeTruthy()
    expect(categoriesTree[0].ancestors).toEqual([])
    expect(categoriesTree[0].children.length).toBe(2)
    expect(categoriesTree[0].children[0].root).toBe(root)
    expect(categoriesTree[0].children[1].root).toBe(root)
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
})
