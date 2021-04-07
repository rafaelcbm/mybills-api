import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addWalletParamsSchema,
  walletSchema,
  walletsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  addWalletParams: addWalletParamsSchema,
  wallet: walletSchema,
  wallets: walletsSchema
}
