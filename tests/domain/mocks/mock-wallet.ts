import faker from 'faker'
import { AddWalletParams } from '@/domain/usecases'
import { LoadWalletsResult } from '../usecases/load-wallets'

export const mockAddWalletParams = (): AddWalletParams => {
  return {
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
