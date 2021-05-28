import {
  loginPath,
  signUpPath,
  walletPath,
  walletParamPath,
  categoryPath,
  categoryParamPath,
  categoryTreePath,
  billPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/wallets': walletPath,
  '/wallets/{walletId}': walletParamPath,
  '/categories': categoryPath,
  '/categories/{categoryId}': categoryParamPath,
  '/categories/tree': categoryTreePath,
  '/bills': billPath
}
