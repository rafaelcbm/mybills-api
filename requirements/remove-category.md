# Remove Category

> ## Success case

1. ❌ Receives a **DELETE** request on **/api/categories/:categoryId**
2. ❌ Validates with a request was made by an authorized user
3. ❌ Validates required field **categoryId**
4. ❌ **Removes** an category with provided data
4.1 ❌ It should remove the children categories
4.2 ❌ It should update the affected bills with the "No category" root category
5. ❌ Returns **204** on success, no content

> ## Exceptions

1. ❌ Returns **403** on unauthorized access
2. ❌ Returns **400** if the user doesn't provide required data
3. ❌ Returns **400** if the provided **categoryId** is not found for the user
4. ❌ Returns **500** on unexpected server error