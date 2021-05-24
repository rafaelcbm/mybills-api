import { AddBill, AddBillParams } from '@/domain/usecases'

export const mockAddBill = (): AddBill => {
  class AddBillStub implements AddBill {
    async add (data: AddBillParams): Promise<void> {
    }
  }
  return new AddBillStub()
}
