# Cadastro

> ## Caso de sucesso

1. ✅ Receives a **POST** request on api/signup**
2. ✅ Validates required fields **name**, **email**, **password** and **passwordConfirmation**
3. ✅ Validates that the **password** and **passwordConfirmation** are equal
4. ✅ Validates that **email** is valid
5. ✅ **Validates** if the provided email is already in use
6. ✅ Generates a **encrypted** password (this password can't be decrypted)
7. ✅ **Creates** an user account with provided data, **reaplacing** the plain password for the encrypted password
8. ✅ Generates an access **token** from user ID
9. ✅ **Updates** user data with the generated access token
10. ✅ Returns **200** with access token and user name

> ## Exceções

1. ✅ Returns **400** if the name, email, password or passwordConfirmation aren't provided
2. ✅ Returns **400** if the password e passwordConfirmation aren't equal
3. ✅ Returns **400** if the email is invalid
4. ✅ Returns **403** if the provided email is already in use
5. ✅ Returns **500** on unexpected server error