import { LoadBalanceByMonth, LoadBalanceByMonthParams, LoadBalanceByMonthResult } from '@/domain/usecases'
import { mockLoadBalanceByMonthResult } from '@/tests/domain/mocks'

export const mockLoadBalanceByMonth = (): LoadBalanceByMonth => {
  class LoadBalanceByMonthStub implements LoadBalanceByMonth {
    async loadBalance (params: LoadBalanceByMonthParams): Promise<LoadBalanceByMonthResult> {
      return mockLoadBalanceByMonthResult()
    }
  }
  return new LoadBalanceByMonthStub()
}
