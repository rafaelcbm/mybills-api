# Add Category

> ## Success case

1. ✅ Receives a **POST** request on **/api/categories**
2. ✅ Validates with a request was made by an authorized user
3. ✅ Validates required fields **name**, **ancestors** and **root** 
4. ✅ **Creates** an category with provided data
5. ✅ Returns **200** on success, with the created category

> ## Exceptions

1. ✅ Returns **403** on unauthorized access
2. ✅ Returns **400** if the user doesn't provide required data
3. ✅ Returns **500** on unexpected server error