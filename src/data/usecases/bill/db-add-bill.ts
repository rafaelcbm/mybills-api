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

    if (bill?.periodicity?.endPart > 1) {
      bill.description = bill.description.concat(` ${bill.periodicity.part} - ${bill.periodicity.endPart}`)

      const billWithNewDescription = Object.assign({},bill, { description: bill.description.concat(` ${bill.periodicity.part} - ${bill.periodicity.endPart}`) })
      const savedBaseBill = await this.addBillRepository.add(billWithNewDescription)

      const periodicBills = this.generatePeriodicBills(savedBaseBill, bill.accountId)
      await this.addManyBillsRepository.addMany(periodicBills)
    } else {
      await this.addBillRepository.add(bill)
    }
  }

  public async checkWallet (bill: AddBillParams): Promise<void> {
    const wallets = await this.loadWalletRepository.loadAll(bill.accountId)
    if (!wallets || wallets.length === 0) {
      throw new GenericBusinessError(WALLET_NOT_FOUND)
    }

    const wallet = wallets.find(w => w.id.toString() === bill.walletId)
    if (!wallet) {
      throw new GenericBusinessError(WALLET_NOT_FOUND)
    }
  }

  public async checkCategory (bill: AddBillParams): Promise<void> {
    const categories = await this.loadCategoriesRepository.loadAll(bill.accountId)
    if (!categories || categories?.length === 0) {
      throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS)
    }

    const category = categories.find(c => c.id.toString() === bill.categoryId)
    if (!category) {
      throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS)
    }
  }

  public generatePeriodicBills (baseBill: AddBillRepositoryResult, accountId: string): AddBillParams[] {
    const periodicBills: AddBillParams[] = []

    for (let actualPart = baseBill.periodicity.part + 1; actualPart <= baseBill.periodicity.endPart; actualPart++) {
      const newBill: AddBillParams = {
        accountId: accountId,
        walletId: baseBill.walletId,
        categoryId: baseBill.categoryId,
        description: baseBill.description.concat(` ${actualPart} - ${baseBill.periodicity.endPart}`),
        date: this.extractDate(baseBill.date, baseBill.periodicity, actualPart),
        value: baseBill.value,
        isDebt: baseBill.isDebt,
        note: baseBill.note,
        periodicity: {
          idReferenceBill: baseBill.id.toString(),
          type: baseBill.periodicity.type,
          interval: baseBill.periodicity.interval,
          part: actualPart,
          endPart: baseBill.periodicity.endPart
        }
      }

      periodicBills.push(newBill)
    }

    return periodicBills
  }

  public extractDate (date: Date, baseBillPeriodicity: BillPeriodicityModel, actualPart: number): Date {
    let computedDate

    switch (baseBillPeriodicity.type) {
      case PeriodicityEnum.DAY:
        computedDate = addDays(date, baseBillPeriodicity.interval * (actualPart - baseBillPeriodicity.part))
        break
      case PeriodicityEnum.WEEK:
        computedDate = addWeeks(date, baseBillPeriodicity.interval * (actualPart - baseBillPeriodicity.part))
        break
      case PeriodicityEnum.MONTH:
        computedDate = addMonths(date, baseBillPeriodicity.interval * (actualPart - baseBillPeriodicity.part))
        break
      case PeriodicityEnum.YEAR:
        computedDate = addYears(date, baseBillPeriodicity.interval * (actualPart - baseBillPeriodicity.part))
        break
    }

    return computedDate
  }
}
