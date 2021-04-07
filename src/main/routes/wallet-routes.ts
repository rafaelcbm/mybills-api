import { adaptRoute } from '@/main/adapters'
import { makeAddWalletController, makeLoadWalletsController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/wallets', auth, adaptRoute(makeAddWalletController()))
  router.get('/wallets', auth, adaptRoute(makeLoadWalletsController()))
}
