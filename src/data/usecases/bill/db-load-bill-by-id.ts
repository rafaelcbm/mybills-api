import { LoadBillByIdRepository } from '@/data/protocols/db/bill/load-bill-by-id-repository'
import { LoadBillById, LoadBillByIdParams, LoadBillByIdResult } from '@/domain/usecases'

export class DbLoadBillById implements LoadBillById {
  constructor(
    private readonly loadBillByIdRepository: LoadBillByIdRepository
  ) { }

  async loadBillById(params: LoadBillByIdParams): Promise<LoadBillByIdResult> {
    return this.loadBillByIdRepository.loadBillById(params)
  }
}
