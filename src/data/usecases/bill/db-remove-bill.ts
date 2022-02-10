import { RemoveBillRepository } from '@/data/protocols'
import { SaveBalancesFromRemovedBill } from '@/domain/usecases/balance/save-balances-from-removed-bill'
import { RemoveBill, RemoveBillParams } from '@/domain/usecases/bill/remove-bill'

export class DbRemoveBill implements RemoveBill {
  constructor(
    private readonly removeBillRepository: RemoveBillRepository,
    private readonly saveBalancesFromRemovedBill: SaveBalancesFromRemovedBill
  ) { }

  async remove(bill: RemoveBillParams): Promise<void> {

  }
}
