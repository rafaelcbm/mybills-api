import { DbSaveBalancesFromBills } from '@/data/usecases/balance/db-save-balances-from-bills'
import { AdjustBalanceService } from '@/domain/service'
import { SaveBalancesFromAddedBills } from '@/domain/usecases'
import { BalanceMongoRepository } from '@/infra/db'

export const makeDbSaveBalancesFromAddedBills = (): SaveBalancesFromAddedBills => {
  const balanceRepository = new BalanceMongoRepository()
  const adjustBalanceService = new AdjustBalanceService()

  return new DbSaveBalancesFromBills(balanceRepository, balanceRepository,
    balanceRepository, balanceRepository, balanceRepository, adjustBalanceService)
}
