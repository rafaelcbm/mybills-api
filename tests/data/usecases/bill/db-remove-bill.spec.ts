import { LoadBillByIdRepository, RemoveBillRepository } from '@/data/protocols'
import { DbRemoveBill } from '@/data/usecases'
import { SaveBalancesFromRemovedBill } from '@/domain/usecases/balance/save-balances-from-removed-bill'
import { mockBillModel, mockSaveBalancesFromRemovedBill } from '@/tests/domain/mocks'
import faker from 'faker'
import { mockLoadBillByIdRepository, mockRemoveBillRepository } from '../../mocks'

type SutTypes = {
  sut: DbRemoveBill
  removeBillRepositoryStub: RemoveBillRepository
  saveBalancesFromRemovedBillStub: SaveBalancesFromRemovedBill
  loadBillByIdRepositoryStub: LoadBillByIdRepository
}

const makeSut = (): SutTypes => {
  const removeBillRepositoryStub = mockRemoveBillRepository()
  const saveBalancesFromRemovedBillStub = mockSaveBalancesFromRemovedBill()
  const loadBillByIdRepositoryStub = mockLoadBillByIdRepository()

  const sut = new DbRemoveBill(
    removeBillRepositoryStub,
    saveBalancesFromRemovedBillStub,
    loadBillByIdRepositoryStub
  )

  return {
    sut,
    removeBillRepositoryStub,
    saveBalancesFromRemovedBillStub,
    loadBillByIdRepositoryStub
  }
}

describe('DbRemoveBill ', () => {
  describe('DbRemoveBill remove', () => {
    test('should call RemoveBillRepository with correct values ', async () => {
      const {
        sut,
        removeBillRepositoryStub,
        saveBalancesFromRemovedBillStub,
        loadBillByIdRepositoryStub
      } = makeSut()

      const billModel = mockBillModel()

      const loadBillByIdRepositorySpy = jest.spyOn(loadBillByIdRepositoryStub, 'loadBillById')
        .mockResolvedValue(billModel)
      const saveBalancesFromRemovedBillSpy = jest.spyOn(saveBalancesFromRemovedBillStub, 'saveBalances')
      const removeBillRepositorySpy = jest.spyOn(removeBillRepositoryStub, 'remove')

      const billParam = {
        accountId: faker.random.word(),
        billId: billModel.id
      }

      await sut.remove(billParam)

      expect(loadBillByIdRepositorySpy).toHaveBeenCalledWith({ accountId: billParam.accountId, id: billParam.billId })
      expect(saveBalancesFromRemovedBillSpy).toHaveBeenCalledWith({ accountId: billParam.accountId, billId: billParam.billId })
      expect(removeBillRepositorySpy).toHaveBeenCalledWith(billParam.accountId, billParam.billId)
    })
  })
})
