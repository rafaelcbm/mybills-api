import faker from 'faker'
import { AddWalletParams } from '@/domain/usecases'

export const mockAddWalletParams = (): AddWalletParams => {
  return {
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}
