# UConnect Backend

## Web Service
https://uconnect-backend.onrender.com

## API Documentation

### GET "/"
- **Description**: Server running
- **Response**:
  - **Status**: 200 OK

### GET "/auth"
- **Description**: Returns the user's information.
- **Request**:
  - **Headers**:
    - Authorization: Bearer <JWTToken~>
- **Response**:
  - **Status**:
    - 200 OK
    - 401 Unauthorized
  - **Body**:
    ```json
    "id": int,
    "email": string,
    "username": string,
    "password_hash": string,
    "points": int,
    "course_list": list[int],
    "created_at": timestamp,
    "updated_at": timestamp
    ```


### POST "/auth/register"
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
