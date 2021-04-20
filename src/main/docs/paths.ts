import {
  loginPath,
  signUpPath,
  walletPath,
  walletParamPath,
  categoryPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/wallets': walletPath,
  '/wallets/{walletId}': walletParamPath,
  '/categories': categoryPath
}
