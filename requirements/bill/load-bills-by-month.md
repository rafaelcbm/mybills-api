# Load Bills by month

> ## Success case

1. ✅ Receives a **GET** request on **/api/bills/month/:yearMonth**, in the format **YYYY-MM**
2. ✅ Validates with a request was made by an authorized user
3. ✅ Validates required parameter **yearMonth**
4. **Returns** **200** on success with the user's bills


> ## Exceptions

1. ✅ Returns **403** on unauthorized access
2. ✅ Returns **500** on unexpected server error