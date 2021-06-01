import { AddBill, AddBillParams, LoadBillsByMonth, LoadBillsByMonthParams, LoadBillsByMonthResult } from '@/domain/usecases'
import { mockLoadBillsByMonthResult } from '@/tests/domain/mocks'

export const mockAddBill = (): AddBill => {
  class AddBillStub implements AddBill {
    async add (data: AddBillParams): Promise<void> {
    }
  }
  return new AddBillStub()
}

export const mockLoadBillsByMonth = (): LoadBillsByMonth => {
  class LoadBillsByMonthStub implements LoadBillsByMonth {
    async loadBills (params: LoadBillsByMonthParams): Promise<LoadBillsByMonthResult[]> {
      return mockLoadBillsByMonthResult()
    }
  }
  return new LoadBillsByMonthStub()
}
