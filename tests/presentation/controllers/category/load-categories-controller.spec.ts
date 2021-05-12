import { LoadCategories } from '@/domain/usecases/category/load-categories'
import { LoadCategoriesController, LoadCategoriesControllerRequest } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { mockLoadCategories } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadCategoriesControllerRequest => ({
  accountId: faker.random.word()
})

type SutTypes = {
  sut: LoadCategoriesController
  loadCategoriesMock: LoadCategories
}

const makeSut = (): SutTypes => {
  const loadCategoriesMock = mockLoadCategories()
  const sut = new LoadCategoriesController(loadCategoriesMock)
  return {
    sut,
    loadCategoriesMock
  }
}

describe('LoadCategories Controller', () => {
  test('Should call LoadCategories with correct values', async () => {
    const { sut, loadCategoriesMock } = makeSut()
    const request = mockRequest()
    const spyLoadCategories = jest.spyOn(loadCategoriesMock, 'loadAll')
    await sut.handle(request)
    expect(spyLoadCategories).toHaveBeenCalledWith(request.accountId)
  })

  test('Should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesMock } = makeSut()
    jest.spyOn(loadCategoriesMock, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(2)
    expect(httpResponse.body[0].id).toBeTruthy()
    expect(httpResponse.body[0].name).toBeTruthy()
    expect(httpResponse.body[0].root).toBeTruthy()
    expect(httpResponse.body[0].ancestors.length).toBe(2)
    expect(httpResponse.body[1].id).toBeTruthy()
    expect(httpResponse.body[1].name).toBeTruthy()
    expect(httpResponse.body[1].root).toBeTruthy()
    expect(httpResponse.body[1].ancestors.length).toBe(2)
  })
})
