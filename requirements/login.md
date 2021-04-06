# Login

> ## Success case

1. ✅ Receives a **POST** request on **/api/login**
2. ✅ Validates required fields **email** and **password**
3. ✅ Validates that the **email** is valid
4. ✅ **Searches** an user from email and password provided
5. ✅ Generates an access **token** from user ID
6. ✅ **Updates** user data with the generated access token
7. ✅ Returns **200** with access token and user name

> ## Exceptions

1. ✅ Returns **400** if the email and password aren't provided
2. ✅ Returns **400** if the email is invalid
3. ✅ Returns **401** if there isn't an user with provided data
4. ✅ Returns **500** on unexpected server error