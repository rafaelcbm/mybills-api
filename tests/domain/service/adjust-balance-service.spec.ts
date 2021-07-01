
import { BillOperation } from '@/domain/models'
import { AdjustBalanceService } from '@/domain/service'
import { AdjustBalanceBill } from '@/domain/usecases'

type SutTypes = {
  sut: AdjustBalanceService
}

const makeSut = (): SutTypes => {
  const sut = new AdjustBalanceService()
  return {
    sut
  }
}

describe('AdjustBalanceService Service', () => {
  test('should calculate balance when including a debt bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const bill: AdjustBalanceBill = { isDebt: true , value: 450 }

    const newBalance = sut.adjust(balance, bill, null, BillOperation.INCLUDE)

    expect(newBalance).toEqual(550)
  })

  test('should calculate balance when including a credit bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const bill: AdjustBalanceBill = { isDebt: false , value: 450 }

    const newBalance = sut.adjust(balance, bill, null, BillOperation.INCLUDE)

    expect(newBalance).toEqual(1450)
  })

  test('should calculate balance when excluding a debt bill ', async () => {
    const { sut } = makeSut()

    const balance = 0
    const bill: AdjustBalanceBill = { isDebt: true , value: 399 }

    const newBalance = sut.adjust(balance, bill, null, BillOperation.EXCLUDE)

    expect(newBalance).toEqual(399)
  })

  test('should calculate balance when excluding a credit bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const bill: AdjustBalanceBill = { isDebt: false , value: 999.99 }

    const newBalance = sut.adjust(balance, bill, null, BillOperation.EXCLUDE)

    expect(newBalance).toEqual(0.01)
  })

  test('should calculate balance when updating a debt bill to a credit bill', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const oldBill: AdjustBalanceBill = { isDebt: true , value: 400 }
    const bill: AdjustBalanceBill = { isDebt: false , value: 500 }

    const newBalance = sut.adjust(balance, bill, oldBill, BillOperation.UPDATE)

    expect(newBalance).toEqual(1900)
  })

  test('should calculate balance when updating a credit bill to a debit bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const oldBill: AdjustBalanceBill = { isDebt: false , value: 400 }
    const bill: AdjustBalanceBill = { isDebt: true , value: 500 }

    const newBalance = sut.adjust(balance, bill, oldBill, BillOperation.UPDATE)

    expect(newBalance).toEqual(100)
  })

  test('should calculate balance when updating a credit bill to a new credit bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const oldBill: AdjustBalanceBill = { isDebt: false , value: 400 }
    const bill: AdjustBalanceBill = { isDebt: false , value: 500 }

    const newBalance = sut.adjust(balance, bill, oldBill, BillOperation.UPDATE)

    expect(newBalance).toEqual(1100)
  })

  test('should calculate balance when updating a debit bill to a new debit bill ', async () => {
    const { sut } = makeSut()

    const balance = 1000
    const oldBill: AdjustBalanceBill = { isDebt: true , value: 400 }
    const bill: AdjustBalanceBill = { isDebt: true , value: 300 }

    const newBalance = sut.adjust(balance, bill, oldBill, BillOperation.UPDATE)

    expect(newBalance).toEqual(1100)
  })
})
