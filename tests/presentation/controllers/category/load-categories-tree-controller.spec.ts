import { LoadCategoriesTree } from '@/domain/usecases/category/load-categories'
import { LoadCategoriesTreeController, LoadCategoriesTreeControllerRequest } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { mockLoadCategories, mockLoadCategoriesTree } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadCategoriesTreeControllerRequest => ({
  accountId: faker.random.word()
})

type SutTypes = {
  sut: LoadCategoriesTreeController
  loadCategoriesTreeMock: LoadCategoriesTree
}

const makeSut = (): SutTypes => {
  const loadCategoriesTreeMock = mockLoadCategoriesTree()
  const sut = new LoadCategoriesTreeController(loadCategoriesTreeMock)
  return {
    sut,
    loadCategoriesTreeMock
  }
}

describe('LoadCategoriesTree Controller', () => {
  test('Should call LoadCategoriesTree with correct values', async () => {
    const { sut, loadCategoriesTreeMock } = makeSut()
    const request = mockRequest()
    const spyLoadCategoriesTree = jest.spyOn(loadCategoriesTreeMock, 'load')
    await sut.handle(request)
    expect(spyLoadCategoriesTree).toHaveBeenCalledWith(request.accountId)
  })

  test('Should return 500 if LoadCategoriesTree throws', async () => {
    const { sut, loadCategoriesTreeMock } = makeSut()
    jest.spyOn(loadCategoriesTreeMock, 'load').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(1)
    expect(httpResponse.body[0].id).toBeTruthy()
    expect(httpResponse.body[0].name).toBeTruthy()
    expect(httpResponse.body[0].root).toBeNull()
    expect(httpResponse.body[0].ancestors.length).toBe(0)
    expect(httpResponse.body[0].children.length).toBe(2)
  })
})
