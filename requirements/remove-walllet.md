# Remove Wallet

> ## Success case

1. ❌ Receives a **DELETE** request on **/api/wallets**
2. ❌ Validates with a request was made by an authorized user
3. ❌ Validates required field **walletId**
4. ❌ **Removes** an wallet with provided data
5. ❌ Returns **204** on success, no content

> ## Exceptions

1. ❌ Returns **403** on unauthorized access
2. ❌ Returns **400** if the user doesn't provide required data
3. ✅ Returns **400** if the provided **walletId** is not found for the user
4. ❌ Returns **500** on unexpected server error