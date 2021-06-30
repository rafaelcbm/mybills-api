import { AddBalanceRepository } from '@/data/protocols'
import { AddBalance, AddBalanceParams } from '@/domain/usecases/'

export class DbAddBalance implements AddBalance {
  constructor (
    private readonly addBalanceRepository: AddBalanceRepository
  ) {}

  async add (balanceParam: AddBalanceParams): Promise<void> {
    return this.addBalanceRepository.add(balanceParam)
  }
}
