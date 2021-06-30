import { UpdateBalanceRepository } from '@/data/protocols'
import { BalanceModel } from '@/domain/models'
import { UpdateBalance } from '@/domain/usecases/'

export class DbUpdateBalance implements UpdateBalance {
  constructor (
    private readonly updateBalanceRepository: UpdateBalanceRepository
  ) {}

  async update (balanceId: string, balanceValue: number): Promise<BalanceModel> {
    return this.updateBalanceRepository.update(balanceId, balanceValue)
  }
}
