import { LoadBalanceByMonthRepository } from '@/data/protocols'
import { LoadBalanceByMonth, LoadBalanceByMonthParams, LoadBalanceByMonthResult } from '@/domain/usecases'

export class DbLoadBalanceByMonth implements LoadBalanceByMonth {
  constructor (
    private readonly loadBillsByMonthRepository: LoadBalanceByMonthRepository
  ) { }

  async loadBalance (params: LoadBalanceByMonthParams): Promise<LoadBalanceByMonthResult> {
    return this.loadBillsByMonthRepository.loadBalance(params)
  }
}
