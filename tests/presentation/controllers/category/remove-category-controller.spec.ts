import { RemoveCategory } from '@/domain/usecases'
import { RemoveCategoryController, RemoveCategoryControllerRequest } from '@/presentation/controllers'
import { badRequest, noContent } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockRemoveCategory, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): RemoveCategoryControllerRequest => ({
  accountId: faker.random.word(),
  categoryId: faker.random.word()
})

type SutTypes = {
  sut: RemoveCategoryController
  validationSpy: ValidationSpy
  removeCategoryMock: RemoveCategory
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removeCategoryMock = mockRemoveCategory()
  const sut = new RemoveCategoryController(validationSpy, removeCategoryMock)
  return {
    sut,
    validationSpy,
    removeCategoryMock
  }
}

describe('RemoveCategory Controller', () => {
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

  test('Should call RemoveCategory with correct values', async () => {
    const { sut, removeCategoryMock } = makeSut()
    const request = mockRequest()
    const spyRemoveCategory = jest.spyOn(removeCategoryMock, 'remove')
    await sut.handle(request)
    expect(spyRemoveCategory).toHaveBeenCalledWith(request.accountId, request.categoryId)
  })

  test('Should return 500 if RemoveCategory throws', async () => {
    const { sut, removeCategoryMock } = makeSut()
    jest.spyOn(removeCategoryMock, 'remove').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
