import { adaptRoute } from '@/main/adapters'
import { makeAddWalletController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/wallets', auth, adaptRoute(makeAddWalletController()))
}
