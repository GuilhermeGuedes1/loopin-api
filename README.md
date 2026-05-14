# Loopin API

Backend API built with NestJS, Prisma, PostgreSQL, and JWT authentication.

This project was designed using a multi-tenant architecture, where each organization has its own users, customers, and visits.

---

# Technologies

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Class Validator

---

# Features

## Authentication

- User signup
- User signin
- JWT authentication
- Protected routes using Guards
- Current authenticated user decorator

## Organizations

- Multi-tenant architecture
- Organizations own users, customers, and visits

## Customers

- Create customer
- List organization customers
- Validation using DTOs
- Duplicate email protection inside the same organization

## Visits

- Register customer visits
- Visit ownership validation
- Relation between visits, customers, organizations, and users

---

# Database Architecture

## Organization

Represents a company/business inside the system.

Each organization can have:

- Multiple users
- Multiple customers
- Multiple visits

---

## User

Represents authenticated users that belong to an organization.

Users can:

- Authenticate
- Create visits
- Manage customers

---

## Customer

Represents clients that belong to an organization.

Customers can:

- Have multiple visits

---

## Visit

Represents customer attendance/history.

Each visit belongs to:

- One customer
- One organization
- One user (createdBy)

---

# Authentication Flow

1. User signs in
2. API validates credentials
3. JWT token is generated
4. Token is sent on protected requests
5. JwtStrategy validates the token
6. Authenticated user is attached to the request
7. Guards protect private routes

---

# Validation

The project uses:

- class-validator
- ValidationPipe

Examples:

- Email validation
- Password minimum length
- UUID validation
- Required fields

---

# Project Structure

```bash
src
 ├── auth
 ├── customers
 ├── visits
 ├── prisma
 ├── decorators
 ├── generated
 └── main.ts
```

---

# Installation

## Clone repository

```bash
git clone <repository-url>
```

## Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/loopin"
JWT_SECRET="your_secret_key"
```

---

# Prisma

## Generate Prisma Client

```bash
npx prisma generate
```

## Run migrations

```bash
npx prisma migrate dev
```

---

# Running the Project

## Development

```bash
npm run start:dev
```

---

# API Security

The backend uses:

- JWT authentication
- Route Guards
- Multi-tenant ownership validation
- Organization context validation

The frontend never controls:

- organizationId
- createdById

These values are extracted from the authenticated user context.

---

# Future Improvements

- Role permissions
- Dashboard analytics
- Pagination
- Search filters
- Soft delete
- Swagger documentation
- Unit tests
- Docker support

---

# Author

Developed by Guilherme Guedes.
