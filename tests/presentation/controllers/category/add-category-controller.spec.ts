import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS } from '@/domain/errors/messages/error-messages'
import { AddCategory } from '@/domain/usecases'
import { AddCategoryController, AddCategoryControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockAddCategory, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): AddCategoryControllerRequest => ({
  name: faker.random.words(),
  accountId: faker.random.word(),
  ancestors: [
    faker.random.word(), faker.random.word()
  ],
  root: faker.random.word()
})

type SutTypes = {
  sut: AddCategoryController
  validationSpy: ValidationSpy
  addCategoryMock: AddCategory
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCategoryMock = mockAddCategory()
  const sut = new AddCategoryController(validationSpy, addCategoryMock)
  return {
    sut,
    validationSpy,
    addCategoryMock
  }
}

describe('AddCategory Controller', () => {
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

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategoryMock } = makeSut()
    const request = mockRequest()
    const spyAddCategory = jest.spyOn(addCategoryMock, 'add')
    await sut.handle(request)
    expect(spyAddCategory).toHaveBeenCalledWith(request)
  })

  test('Should throw if AddCategory throws an business error', async () => {
    const { sut, addCategoryMock } = makeSut()
    jest.spyOn(addCategoryMock, 'add').mockImplementationOnce(() => { throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS) })
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should throw if AddCategory throws an unexpected server error', async () => {
    const { sut, addCategoryMock } = makeSut()
    jest.spyOn(addCategoryMock, 'add').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success, with correct data', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.name).toBeTruthy()
    expect(httpResponse.body.root).toBeTruthy()
    expect(httpResponse.body.ancestors.length).toBe(2)
  })
})
