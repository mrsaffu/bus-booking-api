# Bus Booking System API Documentation

## Overview

The Bus Booking System API allows users to register, log in, book bus tickets, view their bookings, and provides admin-level functionality for managing buses and routes.

---

## Base URL

```
http://localhost:3000/api
```

---

## Authentication Routes

### POST /auth/singup

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

### POST /auth/refresh

**Description:** Generate new access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "your_refresh_token"
}
```

**Response:**

```json
{
  "accessToken": "new_access_token"
}
```

---

## User Routes

### GET /user/search

**Description:** Search available buses.

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Query Parameters:**

```
source=CityA&destination=CityB
```

**Response:**

```json
[
  {
    "_id": "bus_id",
    "name": "Bus A",
    "source": "City A",
    "destination": "City B",
    "departureTime": "2025-07-01T10:00:00Z",
    "arrivalTime": "2025-07-01T14:00:00Z",
    "seats": 40,
    "bookedSeats": [1, 2]
  }
]
```

### POST /user/book

**Description:** Book seats on a bus.

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

### DELETE /user/cancel/\:id

**Description:** Cancel a booking.

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

### GET /user/bookings

**Description:** View all bookings for the logged-in user.

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

---

## Admin Routes

### POST /admin/bus

**Description:** Add a new bus.

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

### PUT /admin/bus/\:id

**Description:** Update bus details.

**Headers:**

```
Authorization: Bearer <adminAccessToken>
```

**Request Body (example):**

```json
{
  "name": "Bus A Updated",
  "seats": 50
}
```

### PUT /admin/bus/\:id/route

**Description:** Update the route of the bus.

**Headers:**

```
Authorization: Bearer <adminAccessToken>
```

**Request Body (example):**

```json
{
  "source": "City A",
  "destination": "City B"
}
```

---



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
````

- Access API at:

  ```
  http://localhost:3000/api
  ```

- Ensure MongoDB is running and available at the hostname you configured (e.g., `mongo`).

---

## Additional Notes

- All datetime fields must be in ISO 8601 format.
- Use `Authorization: Bearer <token>` for all protected endpoints.
- Proper error messages and status codes are returned for each API failure.
- Admin role is required for all admin-related endpoints.
