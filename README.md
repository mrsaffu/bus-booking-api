# Bus Booking System API Documentation

## Overview

The Bus Booking System API allows users to register, log in, book bus tickets, view their bookings, and provides admin-level functionality for managing buses and viewing all bookings.

---

## Base URL

```
http://localhost:3000/api
```

---

## Authentication Routes

### POST /auth/register

**Description:** Register a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /auth/login

**Description:** Authenticate user and receive access and refresh tokens.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

### POST /auth/logout

**Description:** Logout and invalidate the session.

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

---

## User Routes

### POST /user/book

**Description:** Book one or more seats for a specific bus.

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "busId": "bus_object_id",
  "seats": [1, 2]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking successful",
  "booking": {
    "_id": "booking_id",
    "userId": "user_id",
    "busId": "bus_id",
    "seats": [1, 2]
  }
}
```

### GET /user/bookings

**Description:** Retrieve all bookings for the currently logged-in user.

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
[
  {
    "_id": "booking_id",
    "busId": "bus_id",
    "seats": [1, 2],
    "status": "confirmed"
  }
]
```

### DELETE /user/cancel/\:bookingId

**Description:** Cancel a specific booking made by the user.

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Admin Routes

### POST /admin/add-bus

**Description:** Add a new bus to the system.

**Headers:**

```
Authorization: Bearer <adminAccessToken>
```

**Request Body:**

```json
{
  "name": "Bus A",
  "source": "City A",
  "destination": "City B",
  "departureTime": "2025-07-01T10:00:00Z",
  "arrivalTime": "2025-07-01T14:00:00Z",
  "seats": 40
}
```

**Response:**

```json
{
  "success": true,
  "message": "Bus added successfully",
  "bus": {
    "_id": "bus_id",
    "name": "Bus A",
    "source": "City A",
    "destination": "City B",
    "seats": 40
  }
}
```

### GET /admin/bookings

**Description:** View all user bookings in the system.

**Headers:**

```
Authorization: Bearer <adminAccessToken>
```

**Response:**

```json
[
  {
    "_id": "booking_id",
    "user": "john@example.com",
    "busId": "bus_id",
    "seats": [1, 2],
    "status": "confirmed"
  }
]
```

### DELETE /admin/delete-bus/\:busId

**Description:** Remove a bus from the system.

**Headers:**

```
Authorization: Bearer <adminAccessToken>
```

**Response:**

```json
{
  "success": true,
  "message": "Bus deleted successfully"
}
```

---

## Database Schema Overview

### User Schema

* name: String
* email: String (unique)
* password: Hashed String
* role: String (default: "user")

### Bus Schema

* name: String
* source: String
* destination: String
* departureTime: Date
* arrivalTime: Date
* seats: Number
* bookedSeats: \[Number]

### Booking Schema

* userId: ObjectId (ref: User)
* busId: ObjectId (ref: Bus)
* seats: \[Number]
* status: String (default: "confirmed")

---

## Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Request successful    |
| 201  | Resource created      |
| 400  | Bad request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not found             |
| 500  | Internal server error |

---

## Postman Collection

A `postman_collection.json` file is provided in this project to test all API endpoints.

### To use it:

1. Open Postman
2. Click on **Import**
3. Select **File**
4. Upload `postman_collection.json`
5. Click **Import**

This collection includes all endpoints pre-configured with sample request bodies and authentication headers for easy testing.

---

## Deployment Notes

* Update the `.env` file with proper MongoDB URI and JWT secrets before running.
* Use Docker to containerize your app and MongoDB using the `docker-compose.yml`.
* Run the backend using:

  ```bash
  docker-compose up --build
  ```
* Access API at:

  ```
  http://localhost:3000/api
  ```
* Ensure MongoDB is running and available at the hostname you configured (e.g., `mongo`).

---

## Additional Notes

* All datetime fields must be in ISO 8601 format.
* Use `Authorization: Bearer <token>` for all protected endpoints.
* Proper error messages and status codes are returned for each API failure.
* Admin role is required for all admin-related endpoints.
