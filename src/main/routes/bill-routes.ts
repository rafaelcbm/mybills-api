import { adaptRoute } from '@/main/adapters'
import { makeAddBillController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/bills', auth, adaptRoute(makeAddBillController()))
}
