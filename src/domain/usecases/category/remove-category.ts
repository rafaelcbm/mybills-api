export interface RemoveCategory {
  remove: (accountId: string,categoryId: string) => Promise<void>
}
