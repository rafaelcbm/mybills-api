import { LoadBalanceByIdRepository } from '@/data/protocols'
import { LoadBalanceById, LoadBalanceByIdParams, LoadBalanceByIdResult } from '@/domain/usecases'

export class DbLoadBalanceById implements LoadBalanceById {
  constructor(
    private readonly loadBalanceByIdRepository: LoadBalanceByIdRepository
  ) { }

  async loadBalance(params: LoadBalanceByIdParams): Promise<LoadBalanceByIdResult> {
    return this.loadBalanceByIdRepository.loadBalanceById(params)
  }
}
