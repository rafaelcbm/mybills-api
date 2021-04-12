import { AddWallet, AddWalletParams } from '@/domain/usecases/'
import { AddWalletRepository } from '@/data/protocols'

export class DbAddWallet implements AddWallet {
  constructor (
    private readonly addWalletRepository: AddWalletRepository
  ) {}

  async add (walletParam: AddWalletParams): Promise<void> {
    return this.addWalletRepository.add(walletParam)
  }
}
