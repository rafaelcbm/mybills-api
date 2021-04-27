
export interface RemoveChildCategoriesRepository {
  removeChildCategories: (accountId: string, root: string) => Promise<number>
}
