import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController, makeLoadCategoriesController, makeLoadCategoriesTreeController, makeRemoveCategoryController, makeUpdateCategoryController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  router.delete('/categories/:categoryId', auth, adaptRoute(makeRemoveCategoryController()))
  router.put('/categories/:categoryId', auth, adaptRoute(makeUpdateCategoryController()))
  router.get('/categories/tree', auth, adaptRoute(makeLoadCategoriesTreeController()))
}
