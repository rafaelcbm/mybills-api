# Update Wallet

> ## Success case

1. ✅ Receives a **PUT** request on **/api/wallets/:walletId**
2. ✅ Validates with a request was made by an authorized user
3. ✅ Validates required field **walletId** and **name**
4. ✅ **Updates** an wallet with provided data
5. ✅ Returns **200** on success, with the updated wallet

> ## Exceptions

1. ✅ Returns **403** on unauthorized access
2. ✅ Returns **400** if the user doesn't provide required data
3. ✅ Returns **400** if the provided **walletId** is not found for the user
4. ✅ Returns **500** on unexpected server error