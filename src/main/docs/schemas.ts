import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addWalletParamsSchema,
  walletSchema,
  walletsSchema,
  categorySchema,
  categoriesSchema,
  addCategoryParamsSchema,
  updateCategoryParamsSchema,
  categoryTreeSchema,
  addBillParamsSchema,
  billSchema,
  billsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  addWalletParams: addWalletParamsSchema,
  wallet: walletSchema,
  wallets: walletsSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryParams: addCategoryParamsSchema,
  updateCategoryParams: updateCategoryParamsSchema,
  categoriesTree: categoryTreeSchema,
  addBillParams: addBillParamsSchema,
  bill: billSchema,
  bills: billsSchema
}
