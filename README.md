# Courses API

A comprehensive RESTful API built with Node.js, Express, and MongoDB for managing courses and users, including role-based access control. This API provides an efficient backend for managing courses, user authentication, and user roles in any learning platform.

## Features

- **CRUD Operations for Courses and Users:** Full Create, Read, Update, and Delete operations for both courses and users.
- **Role-Based Access Control:** User roles including Admin, Manager, and User, ensuring proper permissions for accessing specific routes.
- **JWT Authentication:** Secure authentication and authorization using JSON Web Tokens.
- **Input Validation:** Validation for course title and price, ensuring data integrity.
- **User Avatars:** Users can manage their profile avatars with a default option.
- **Error Handling:** Comprehensive validation and error-handling throughout the API.

## Technologies

- **Node.js & Express:** Backend framework for handling API requests and routing.
- **MongoDB & Mongoose:** NoSQL database for data storage.
- **JWT (JSON Web Tokens):** Authentication for secure access control.
- **bcrypt:** Password hashing for security.
- **dotenv:** For managing environment variables.
- **Postman / Insomnia:** API testing tools.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Mos3aB696/Courses_API.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Courses_API
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. Start the server:
    ```bash
    npm run start
    ```

   The API will be accessible at `http://localhost:5000`.

## Database Models

### User Model

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "string", // Can be 'USER', 'ADMIN', 'MANAGER'
  "password": "string",
  "token": "string",
  "avatar": "string"
}
```

- **firstName & lastName:** Required, with a minimum length of 3 characters.
- **email:** Unique and validated for proper format.
- **role:** Enum for `USER`, `ADMIN`, and `MANAGER`. Defaults to `USER`.
- **password:** Minimum length of 8 characters, hashed with `bcrypt`.
- **avatar:** URL for user profile image, with a default value of `"/uploads/profile.png"`.

### Course Model

```json
{
  "title": "string",
  "price": "number"
}
```

- **title:** Required, with a minimum length of 3 and a maximum length of 255 characters. Only letters and spaces are allowed.
- **price:** Required, must be a non-negative number.

## API Endpoints

### Courses

- `GET /api/courses` - Get all courses.
- `GET /api/courses/:id` - Get a specific course by ID.
- `POST /api/courses` - Create a new course (Admin/Manager only).
- `PUT /api/courses/:id` - Update a course by ID (Admin/Manager only).
- `DELETE /api/courses/:id` - Delete a course by ID (Admin only).

### Users

- `GET /api/users` - Get all users (Admin/Manager only).
- `GET /api/users/:id` - Get a specific user by ID (Admin/Manager only).
- `POST /api/users` - Create a new user (Admin only).
- `PUT /api/users/:id` - Update a user by ID (Admin/Manager only).
- `DELETE /api/users/:id` - Delete a user by ID (Admin only).

### Authentication

- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Login a user and get a JWT token.

### Roles & Permissions

- **USER:** Can view courses.
- **ADMIN:** Full access to courses and user management.
- **MANAGER:** Can create and manage courses but cannot manage users.

## Usage

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Example: Create a New Course (Admin/Manager only)
```bash
POST /api/courses
```
**Body:**
```json
{
  "title": "Introduction to JavaScript",
  "price": 50
}
```

### Example: Register a New User
```bash
POST /api/users/register
```
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

**Mosaab Abdelkawy**
- [LinkedIn](https://www.linkedin.com/in/mosaab-abdelkawy/)
- [YouTube](https://youtube.com/@tapseta696?si=7q1LRJdUoOW2Yamk)
