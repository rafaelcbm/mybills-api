import { adaptRoute } from '@/main/adapters'
import { makeAddWalletController, makeLoadWalletsController, makeUpdateWalletController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'
import { makeRemoveWalletController } from '../factories/controllers/wallet/remove-wallet-controller-factory'

export default (router: Router): void => {
  router.post('/wallets', auth, adaptRoute(makeAddWalletController()))
  router.get('/wallets', auth, adaptRoute(makeLoadWalletsController()))
  router.delete('/wallets/:walletId', auth, adaptRoute(makeRemoveWalletController()))
  router.put('/wallets/:walletId', auth, adaptRoute(makeUpdateWalletController()))
}
