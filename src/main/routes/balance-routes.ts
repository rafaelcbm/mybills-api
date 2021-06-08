import { adaptRoute } from '@/main/adapters'
import { makeLoadBalanceByMonthController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/balance/month/:yearMonth', auth, adaptRoute(makeLoadBalanceByMonthController()))
}
