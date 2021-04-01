import { AddWallet, AddWalletParams } from '@/domain/usecases/add-wallet'
import { AddWalletRepository } from '../protocols/db/wallet/add-wallet-repository'

export class DbAddWallet implements AddWallet {
  constructor (
    private readonly addWalletRepository: AddWalletRepository
  ) {}

  async add (walletParam: AddWalletParams): Promise<void> {
    return this.addWalletRepository.add(walletParam)
  }
}
