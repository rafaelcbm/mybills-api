import { DbSaveBalancesFromRemovedBill } from '@/data/usecases'
import { AdjustBalanceService } from '@/domain/service'
import { SaveBalancesFromRemovedBill } from '@/domain/usecases/balance/save-balances-from-removed-bill'
import { BalanceMongoRepository, BillMongoRepository } from '@/infra/db'

export const makeDbSaveBalancesFromRemovedBill = (): SaveBalancesFromRemovedBill => {
  const loadBillByIdRepository = new BillMongoRepository()
  const balanceRepository = new BalanceMongoRepository()
  const adjustBalanceService = new AdjustBalanceService()

  return new DbSaveBalancesFromRemovedBill(loadBillByIdRepository, balanceRepository,
    adjustBalanceService, balanceRepository, balanceRepository)
}
