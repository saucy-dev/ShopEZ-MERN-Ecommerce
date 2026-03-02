# ShopEZ

## One-Stop Shop for Online Purchases

ShopEZ is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The project demonstrates real-world architecture including authentication, role-based access control, RESTful API design, and structured backend implementation using MVC principles.

The platform supports both customer-facing shopping workflows and administrative product/order management.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Core Features](#core-features)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Installation & Setup](#installation--setup)
* [Environment Configuration](#environment-configuration)
* [Database Seeding](#database-seeding)
* [Running the Application](#running-the-application)
* [API Reference](#api-reference)
* [Authentication & Authorization](#authentication--authorization)
* [Security Practices](#security-practices)
* [Future Improvements](#future-improvements)
* [License](#license)

---

## Project Overview

ShopEZ is designed as a scalable and maintainable e-commerce platform. It includes:

* Secure user authentication and session handling
* Product browsing with search and filtering
* Shopping cart and checkout workflow
* Order management system
* Role-based administrative control

The backend follows MVC architecture and RESTful standards, while the frontend is built using a modular React component structure.

---

## Core Features

### Customer Features

* User registration and login with JWT authentication
* Persistent login session
* Product listing with:

  * Keyword search
  * Category filtering
  * Pagination
* Product detail pages with ratings and reviews
* Persistent shopping cart with automatic total calculation
* Multi-step checkout flow:

  * Shipping
  * Payment
  * Review
  * Confirmation
* Order history and status tracking
* Light and dark theme support

### Admin Features

* Role-based protected routes
* Product management (Create, Update, Delete)
* Order management with status updates
* Administrative dashboard overview

---

## System Architecture

### Backend

* Node.js + Express.js
* MVC pattern
* RESTful API design
* JWT authentication middleware
* MongoDB schema modeling using Mongoose

### Frontend

* React 18 with Vite
* Context API with useReducer
* Axios with JWT interceptor
* Protected routes for authenticated and admin users

---

## Technology Stack

### Frontend

* React 18
* Vite
* React Router v6
* Context API
* Axios

### Backend

* Node.js
* Express.js
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs

### Database

* MongoDB Atlas

---

## Installation & Setup

### Prerequisites

* Node.js 18 or higher
* Git
* MongoDB Atlas account

---

### Clone the Repository

```bash
git clone https://github.com/saucy-dev/shopez.git
cd ShopEZ-MERN-Ecommerce
```

---

### Install Dependencies

Windows (PowerShell):

```powershell
cd backend; npm install; cd ../frontend; npm install; cd ..
```

Mac / Linux:

```bash
cd backend && npm install && cd ../frontend && npm install && cd ..
```

---

## Environment Configuration

Create a `.env` file inside the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopez
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:5173
```

Replace the MongoDB credentials with your Atlas connection string.

---

## Database Seeding

To seed demo data:

```bash
cd backend
node seeder.js
```

Demo Accounts:

Admin
Email: [admin@shopez.com](mailto:admin@shopez.com)
Password: admin123

User
Email: [john@shopez.com](mailto:john@shopez.com)
Password: john1234

To destroy all data:

```bash
node seeder.js -d
```

---

## Running the Application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Default URLs:

Backend: [http://localhost:5000](http://localhost:5000)
Frontend: [http://localhost:5173](http://localhost:5173)

---

## API Reference

### Authentication

POST /api/users/register
POST /api/users/login
GET /api/users/profile
PUT /api/users/profile

### Products

GET /api/products
GET /api/products/:id
POST /api/products (Admin)
PUT /api/products/:id (Admin)
DELETE /api/products/:id (Admin)
POST /api/products/:id/reviews (Authenticated Users)

### Orders

POST /api/orders
GET /api/orders/myorders
GET /api/orders/:id
PUT /api/orders/:id/pay
GET /api/orders (Admin)
PUT /api/orders/:id/status (Admin)

---

## Authentication & Authorization

* Stateless JWT-based authentication
* Middleware-protected private routes
* Role-based authorization for admin endpoints
* Password hashing using bcrypt

---

## Security Practices

* Environment variable configuration
* Encrypted password storage
* Protected API routes
* Token validation middleware
* Structured separation of concerns

---

## Future Improvements

* Payment gateway integration
* Docker containerization
* Reverse proxy with Nginx
* HTTPS deployment
* Redis caching layer
* CI/CD pipeline integration
* Unit and integration testing

---
