import { BillModel } from '@/domain/models'

export interface RemoveBillRepository {
  remove: (accountId: string, billId: string) => Promise<BillModel>
}
