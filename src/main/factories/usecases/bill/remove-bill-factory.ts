import { DbRemoveBill } from '@/data/usecases'
import { RemoveBill } from '@/domain/usecases'
import { BillMongoRepository } from '@/infra/db'
import { makeDbSaveBalancesFromRemovedBill } from '..'

export const makeDbRemoveBill = (): RemoveBill => {
  const billRepository = new BillMongoRepository()
  const saveBalancesFromRemovedBill = makeDbSaveBalancesFromRemovedBill()

  return new DbRemoveBill(
    billRepository,
    saveBalancesFromRemovedBill,
    billRepository)
}
