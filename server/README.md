# UConnect Backend

## Web Service
https://uconnect-backend.onrender.com

## API Documentation

### GET "/"
- **Method**: GET
- **Description**: Server running
- **Response**:
  - **Status**: 200 OK

### POST "/auth/register"
- **Method**: POST
- **Description**: Registers a new user and returns a JWT token.
- **Request Body**:
  - **Headers**: None
  - **Body**:
    application/json
    ```json
    {
      "username": "string",
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

### POST "/auth/login"
- **Method**: POST
- **Description**: Authenticates a user and returns a JWT token.
- **Request**
  - **Headers**: None
  - **Body**:
  application/json
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Status**: 
    - 200 OK
    - 401 Unauthorized
    - 404 Not Found
  - **Body**:
    ```json
    {
      "token": "string"
    }
    ```
