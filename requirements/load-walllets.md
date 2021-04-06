# Load Wallet

> ## Success case

1. ✅ Receives a **GET** request on **/api/wallets**
2. ✅ Validates with a request was made by an authorized user
3. ✅ **Returns** **200** on success with the user's wallets

> ## Exceptions

1. ✅ Returns **403** on unauthorized access
2. ✅ Returns **500** on unexpected server error