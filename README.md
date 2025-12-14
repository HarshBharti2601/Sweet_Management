# Sweet Management System

Sweet Management System is a backend REST API built using **TypeScript, Node.js, Express, and Prisma**.  
The application manages sweets inventory with authentication, role-based access control, purchasing, and restocking functionality.

This project demonstrates clean backend architecture, secure authentication, database transactions, and inventory logging.

API :- https://sweet-management-for-harsh.vercel.app/

---

## Project Overview

The system allows authenticated users to:

- Register and log in using JWT authentication
- View and search available sweets
- Purchase sweets (inventory is reduced safely using transactions)

Admin users can:

- Add new sweets
- Update existing sweets
- Delete sweets
- Restock sweets

Every purchase and restock operation is logged in the database for traceability.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs (password hashing)
- **Other:** CORS, dotenv

---

## Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (v18 or higher)
- npm
- PostgreSQL

### Clone Repository

```bash
git clone https://github.com/HarshBharti2601/Sweet_Management.git
cd Sweet_Management
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/sweetdb"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

---

## Database Setup

Run Prisma commands to set up the database:

```bash
npx prisma migrate dev
```

or

```bash
npx prisma db push
```

Generate Prisma client:

```bash
npx prisma generate
```

---

## Running the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## API Routes

### Authentication

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT |

### Sweets (Protected)

| Method | Endpoint | Access | Description |
|------|--------|-------|-------------|
| POST | /api/sweets | User | Add a sweet |
| GET | /api/sweets | User | Get all sweets |
| GET | /api/sweets/search | User | Search sweets |
| PUT | /api/sweets/:id | User | Update sweet |
| DELETE | /api/sweets/:id | Admin | Delete sweet |

### Inventory

| Method | Endpoint | Access | Description |
|------|--------|-------|-------------|
| POST | /api/sweets/:id/purchase | User | Purchase sweet |
| POST | /api/sweets/:id/restock | Admin | Restock sweet |

---

## Authentication & Authorization

- JWT tokens are required for all protected routes
- Token must be sent as:

```
Authorization: Bearer <token>
```

- Admin-only routes are protected using role-based middleware

---

### Admin Login Credentials (For Testing)

Use the following credentials to log in as an **Admin** and test all admin-only features such as adding, deleting, and restocking sweets.

- **Email:** `admin@admin.com`
- **Password:** `iamadmin`

> ⚠️ These credentials are for testing/demo purposes only.


## Database Models

- **User** (USER / ADMIN roles)
- **Sweet**
- **InventoryLog**
- Inventory actions are tracked as PURCHASE or RESTOCK

All inventory updates use Prisma transactions to ensure data consistency.

---

## Testing

Currently, no automated test suite is implemented.

You can manually test the APIs using:

- Postman
- Thunder Client
- curl

Example test flow:

1. Register user
2. Login and copy JWT token
3. Access protected routes
4. Perform purchase and restock actions

---


## My AI Usage

### AI Tools Used

- **ChatGPT (OpenAI)**

### How I Used Them

-Used ChatGPT to debug and fix issues in my Prisma schema.
-Used ChatGPT to recall and correctly apply Prisma ORM syntax while developing database queries and relationships.


### Reflection on AI Usage

AI tools gave me more time to focus on application logic and problem solving instead of worrying about the constantly changing syntax of libraries. Rather than spending time searching through long documentation, I was able to concentrate on implementation details and overall system design, which helped me build the project more effectively and confidently.

---

