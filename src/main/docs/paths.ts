import {
  loginPath,
  signUpPath,
  walletPath,
  walletParamPath,
  categoryPath,
  categoryParamPath,
  categoryTreePath,
  billPath,
  billsByMonthPath,
  balanceByMonthPath,
  billParamPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/wallets': walletPath,
  '/wallets/{walletId}': walletParamPath,
  '/categories': categoryPath,
  '/categories/{categoryId}': categoryParamPath,
  '/categories/tree': categoryTreePath,
  '/bills': billPath,
  '/bills/{billId}': billParamPath,
  '/bills/month/{yearMonth}': billsByMonthPath,
  '/balance/month/{yearMonth}': balanceByMonthPath
}
