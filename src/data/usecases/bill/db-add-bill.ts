import { AddBillRepository, AddBillRepositoryResult, AddManyBillsRepository, LoadCategoriesRepository, LoadWalletsRepository } from '@/data/protocols'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS, WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { BillPeriodicityModel, PeriodicityEnum } from '@/domain/models'
import { AddBill, AddBillParams } from '@/domain/usecases/bill/add-bill'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import addYears from 'date-fns/addYears'

export class DbAddBill implements AddBill {
  constructor (
    private readonly loadWalletRepository: LoadWalletsRepository,
    private readonly loadCategoriesRepository: LoadCategoriesRepository,
    private readonly addBillRepository: AddBillRepository,
    private readonly addManyBillsRepository: AddManyBillsRepository) { }

  async add (bill: AddBillParams): Promise<void> {
    await this.checkWallet(bill)

    await this.checkCategory(bill)

    if (bill?.periodicity?.length > 1) {
      bill.description = bill.description.concat(` ${bill.periodicity.part} - ${bill.periodicity.length} `)
      const savedBaseBill = await this.addBillRepository.add(bill)

      const periodicBills = this.generatePeriodicBills(savedBaseBill, bill.accountId)
      await this.addManyBillsRepository.add(periodicBills)
    } else {
      await this.addBillRepository.add(bill)
    }
  }

  private async checkWallet (bill: AddBillParams): Promise<void> {
    const wallets = await this.loadWalletRepository.loadAll(bill.accountId)
    if (!wallets || wallets.length === 0) {
      throw new GenericBusinessError(WALLET_NOT_FOUND)
    }

    const wallet = wallets.find(w => w.id.toString() === bill.walletId)
    if (!wallet) {
      throw new GenericBusinessError(WALLET_NOT_FOUND)
    }
  }

  private async checkCategory (bill: AddBillParams): Promise<void> {
    const categories = await this.loadCategoriesRepository.loadAll(bill.accountId)
    if (!categories || categories?.length === 0) {
      throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS)
    }

    const category = categories.find(c => c.id.toString() === bill.categoryId)
    if (!category) {
      throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS)
    }
  }

  private generatePeriodicBills (baseBill: AddBillRepositoryResult, accountId: string): AddBillParams[] {
    const periodicBills: AddBillParams[] = []

    for (let actualPart = baseBill.periodicity.part + 1; actualPart <= baseBill.periodicity.length; actualPart++) {
      const newBill: AddBillParams = {
        accountId: accountId,
        walletId: baseBill.walletId,
        categoryId: baseBill.categoryId,
        description: baseBill.description.concat(` ${actualPart} - ${baseBill.periodicity.length} `),
        date: this.extractDate(baseBill.date, baseBill.periodicity, actualPart),
        value: baseBill.value,
        isDebt: baseBill.isDebt,
        note: baseBill.note,
        periodicity: {
          idReferenceBill: baseBill.id.toString(),
          type: baseBill.periodicity.type,
          interval: baseBill.periodicity.interval,
          part: actualPart,
          length: baseBill.periodicity.length
        }
      }

      periodicBills.push(newBill)
    }

    return periodicBills
  }

  private extractDate (date: Date, periodicity: BillPeriodicityModel, actualPart: number): Date {
    let computedDate

    switch (periodicity.type) {
      case PeriodicityEnum.DAY:
        computedDate = addDays(date, periodicity.interval * (actualPart - periodicity.part))
        break
      case PeriodicityEnum.WEEK:
        computedDate = addWeeks(date, periodicity.interval * (actualPart - periodicity.part))
        break
      case PeriodicityEnum.MONTH:
        computedDate = addMonths(date, periodicity.interval * (actualPart - periodicity.part))
        break
      case PeriodicityEnum.YEAR:
        computedDate = addYears(date, periodicity.interval * (actualPart - periodicity.part))
        break
    }

    return computedDate
  }
}
