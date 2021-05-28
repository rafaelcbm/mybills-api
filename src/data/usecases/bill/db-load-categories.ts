import { LoadBillsByMonthRepository } from '@/data/protocols'
import { LoadBillsByMonth, LoadBillsByMonthParams, LoadBillsByMonthResult } from '@/domain/usecases'

export class DbLoadBillsByMonth implements LoadBillsByMonth {
  constructor (
    private readonly loadBillsByMonthRepository: LoadBillsByMonthRepository
  ) { }

  async loadBills (params: LoadBillsByMonthParams): Promise<LoadBillsByMonthResult[]> {
    return this.loadBillsByMonthRepository.loadBills(params)
  }
}
