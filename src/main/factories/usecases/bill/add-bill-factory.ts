import { DbAddBill } from '@/data/usecases'
import { AddBill } from '@/domain/usecases'
import { BillMongoRepository, CategoryMongoRepository, WalletMongoRepository } from '@/infra/db'

export const makeDbAddBill = (): AddBill => {
  const billRepository = new BillMongoRepository()
  const loadWalletRepository = new WalletMongoRepository()
  const loadCategoriesRepository = new CategoryMongoRepository()

  return new DbAddBill(
    loadWalletRepository, loadCategoriesRepository, billRepository, billRepository)
}
