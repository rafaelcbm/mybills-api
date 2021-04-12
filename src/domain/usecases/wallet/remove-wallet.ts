export interface RemoveWallet {
  remove: (walletId: string, accountId: string) => Promise<void>
}
