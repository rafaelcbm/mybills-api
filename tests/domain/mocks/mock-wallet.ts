import { AddWalletParams } from '@/domain/usecases'
import { WalletModel } from '@/domain/models'
import { LoadWalletsResult } from '@/domain/usecases/wallet/load-wallets'
import faker from 'faker'

export const mockAddWalletParams = (): AddWalletParams => {
  return {
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}

export const mockWalletModel = (id?: string): WalletModel => {
  return {
    id: id || faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}

export const mockLoadWalletsResult = (): LoadWalletsResult[] => {
  return [{
    id: faker.random.word(),
    name: faker.random.words()
  },{
    id: faker.random.word(),
    name: faker.random.words()
  }]
}
