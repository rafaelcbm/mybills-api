import { LoadCategoriesResult } from './load-categories'

export type LoadCategoriesTreeResult = {
  id: string
  name: string
  ancestors: string[]
  root: string
  children: LoadCategoriesResult[]
}

export interface LoadCategoriesTree {
  load: (accountId: string) => Promise<LoadCategoriesTreeResult[]>
}
