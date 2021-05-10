import { UpdateCategory } from '@/domain/usecases'
import { UpdateCategoryController, UpdateCategoryControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockUpdateCategory, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): UpdateCategoryControllerRequest => ({
  accountId: faker.random.word(),
  categoryId: faker.random.word(),
  name: faker.random.word()
})

type SutTypes = {
  sut: UpdateCategoryController
  validationSpy: ValidationSpy
  updateCategoryMock: UpdateCategory
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateCategoryMock = mockUpdateCategory()
  const sut = new UpdateCategoryController(validationSpy, updateCategoryMock)
  return {
    sut,
    validationSpy,
    updateCategoryMock
  }
}

describe('UpdateCategory Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call UpdateCategory with correct values', async () => {
    const { sut, updateCategoryMock } = makeSut()
    const request = mockRequest()
    const spyUpdateCategory = jest.spyOn(updateCategoryMock, 'update')
    await sut.handle(request)
    expect(spyUpdateCategory).toHaveBeenCalledWith({ id: request.categoryId, accountId: request.accountId, name: request.name })
  })

  test('Should return 500 if UpdateCategory throws', async () => {
    const { sut, updateCategoryMock } = makeSut()
    jest.spyOn(updateCategoryMock, 'update').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success with category data', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.accountId).toBeTruthy()
    expect(httpResponse.body.name).toBeTruthy()
  })
})
