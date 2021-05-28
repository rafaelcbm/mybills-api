# Add Bill

> ## Success case

1. ✅ Receives a **POST** request on **/api/bills**
2. ✅ Validates with a request was made by an authorized user
3. ✅ Validates required fields **walletId**, **categoryId**, **description**, **date**, **value** and **isDebt**.
4. ✅ **Creates** a bill with provided data:
```
     {  
        walletId: string
        categoryId: string
        description: string
        date: Date
        value: number
        isDebt: boolean
        note?: string
        periodicity?: {          
          type: number // (0 = DAY,  1 = WEEK, 2 = MONTH, 3 = YEAR)
          interval: number
          part: number
          endPart: number
      }
  ```

   - 4.1. ✅ If the bill has the **periodicity** attribute then the periodic bills should also be created.

5. ✅ Returns **204** on success.

> ## Exceptions

1. ✅ Returns **403** on unauthorized access
2. ✅ Returns **400** if the user doesn't provide required data
2. ✅ Returns **400** if the category id is not valid for the user
2. ✅ Returns **400** if the wallet id is not valid for the user
3. ✅ Returns **500** on unexpected server error