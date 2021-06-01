import { adaptRoute } from '@/main/adapters'
import { makeAddBillController, makeLoadBillsByMonthController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/bills/month/:yearMonth', auth, adaptRoute(makeLoadBillsByMonthController()))
  router.post('/bills', auth, adaptRoute(makeAddBillController()))
}
