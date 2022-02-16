import { LoadBillByIdRepository, RemoveBillRepository } from '@/data/protocols'
import { GenericBusinessError } from '@/domain/errors'
import { BILL_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { SaveBalancesFromRemovedBill } from '@/domain/usecases/balance/save-balances-from-removed-bill'
import { RemoveBill, RemoveBillParams } from '@/domain/usecases/bill/remove-bill'

export class DbRemoveBill implements RemoveBill {
  constructor(
    private readonly removeBillRepository: RemoveBillRepository,
    private readonly saveBalancesFromRemovedBill: SaveBalancesFromRemovedBill,
    private readonly loadBillByIdRepository: LoadBillByIdRepository
  ) { }

  async remove(billParam: RemoveBillParams): Promise<void> {
    const bill = await this.loadBillByIdRepository.loadBillById({ accountId: billParam.accountId, id: billParam.billId })

    if (!bill) {
      throw new GenericBusinessError(BILL_NOT_FOUND)
    }

    await this.saveBalancesFromRemovedBill.saveBalances({ accountId: billParam.accountId, billId: billParam.billId })

    await this.removeBillRepository.remove({ accountId: billParam.accountId, billId: bill.id })
  }
}
