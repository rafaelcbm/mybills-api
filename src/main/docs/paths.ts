import {
  loginPath,
  signUpPath,
  walletPath,
  walletParamPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/wallets': walletPath,
  '/wallets/{walletId}': walletParamPath
}
