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
    - Authorization: Bearer "JWTToken"
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
      "username": "string",
      "email": "string",
      "password": "string"
    ```
- **Response**:
  - **Status**: 201 Created
  - **Body**:
    ```json
      "token": "string"
    ```

### POST "/auth/login"
- **Description**: Authenticates a user and returns a JWT token.
- **Request**
  - **Headers**: None
  - **Body**:
  application/json
  ```json
    "email": "string",
    "password": "string"
  ```
- **Response**:
  - **Status**: 
    - 200 OK
    - 401 Unauthorized
    - 404 Not Found
  - **Body**:
    ```json
      "token": "string"
    ```

### GET "/courses"
- **Description**: Returns a list of all courses.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
- **Response**:
  - **Status**:
    - 200 OK
  - **Body**:
    ```json
      "id": int,
      "course_subject": string,
      "course_name": string,
      "users": list[int]
    ```

### GET "/courses/:id"
- **Description**: Returns the details of a specific course by ID.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
- **Response**:
  - **Status**:
    - 200 OK
    - 404 Not Found
  - **Body**:
    ```json
      "id": int,
      "course_subject": string,
      "course_name": string,
      "users": list[int]
    ```

### POST "/courses"
- **Description**: Creates a new course.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
  - **Query Params**:
    - `?autojoin`: boolean
  - **Body**:
    application/json
    ```json
      "course_subject": "string",
      "course_name": "string"
    ```
- **Response**:
  - **Status**: 201 Created
  - **Body**:
    ```json
      "id": int
    ```

### PUT "/courses/:id"
- **Description**: Updates an existing course by ID.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
  - **Params**:
    - id: int
  - **Body**:
    application/json
    ```json
      "course_subject": "string",
      "course_name": "string"
    ```
- **Response**:
  - **Status**:
    - 200 OK
    - 400 Bad Request
    - 404 Not Found
  - **Body**:
    ```json
      "id": int,
      "course_subject": string,
      "course_name": string
    ```

### DELETE "/courses/:id"
- **Description**: Deletes a course by ID.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
  - **Params**:
    - id: int
- **Response**:
  - **Status**:
    - 200 OK
    - 404 Not Found
  - **Body**:
    ```json
      "message": "Course deleted successfully"
    ```

### POST "/courses/:id/join"
- **Description**: Adds the user to the course.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
  - **Params**:
    - id: int
- **Response**:
  - **Status**:
    - 200 OK
    - 400 Bad Request
    - 404 Not Found
  - **Body**:
    ```json
      "message": "User joined course successfully"
    ```

### POST "/courses/:id/leave"
- **Description**: Removes the user from the course.
- **Request**:
  - **Headers**:
    - Authorization: Bearer "JWTToken"
  - **Params**:
    - id: int
- **Response**:
  - **Status**:
    - 200 OK
    - 400 Bad Request
    - 404 Not Found
  - **Body**:
    ```json
      "message": "User left course successfully"
    ```