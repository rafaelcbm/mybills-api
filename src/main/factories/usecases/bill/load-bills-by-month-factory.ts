import { DbLoadBillsByMonth } from '@/data/usecases'
import { LoadBillsByMonth } from '@/domain/usecases'
import { BillMongoRepository } from '@/infra/db'

export const makeDbLoadBillsByMonth = (): LoadBillsByMonth => {
  const billRepository = new BillMongoRepository()

  return new DbLoadBillsByMonth(billRepository)
}
