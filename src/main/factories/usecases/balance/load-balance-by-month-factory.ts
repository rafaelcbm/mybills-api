import { DbLoadBalanceByMonth } from '@/data/usecases'
import { LoadBalanceByMonth } from '@/domain/usecases'
import { BalanceMongoRepository } from '@/infra/db'

export const makeDbLoadBalanceByMonth = (): LoadBalanceByMonth => {
  const balanceRepository = new BalanceMongoRepository()

  return new DbLoadBalanceByMonth(balanceRepository)
}
