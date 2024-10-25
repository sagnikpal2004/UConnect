# UConnect Backend

## API Documentation

### GET "/"
- **Method**: GET
- **Description**: Server running
- **Response**:
  - **Status**: 200 OK

### POST "/register"
- **Method**: POST
- **Description**: Registers a new user and returns a JWT token.
- **Request Body**:
  - **Content-Type**: application/json
  - **Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
  - **Status**: 201 Created
  - **Body**:
    ```json
    {
      "token": "string"
    }
    ```
- **Example**:
  - **Request**:
    ```sh
    curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john.doe@example.com","password":"password123"}'
    ```
  - **Response**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

### POST "/login"
- **Method**: POST
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  - **Content-Type**: application/json
  - **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
  - **Status**: 200 OK
  - **Body**:
    ```json
    {
      "token": "string"
    }
    ```
  - **Status**: 404 Not Found
    - **Description**: User not found
  - **Status**: 401 Unauthorized
    - **Description**: Invalid password
- **Example**:
  - **Request**:
    ```sh
    curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","password":"password123"}'
    ```
  - **Response**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```