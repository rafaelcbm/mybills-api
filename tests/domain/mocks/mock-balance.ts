import { LoadBalanceByMonthResult } from '@/domain/usecases'
import faker from 'faker'

export const mockLoadBalanceByMonthResult = (): LoadBalanceByMonthResult => {
  return {
    id: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}
