<div align="center">

# 🛒 ShopEZ

### One-Stop Shop for Online Purchases

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

**A production-ready full-stack e-commerce platform built with the MERN stack.**

[Live Demo](#) · [Report Bug](https://github.com/yourusername/shopez/issues) · [Request Feature](https://github.com/yourusername/shopez/issues)

</div>

---

## ✨ Features

### 🛍️ Customer
- JWT-based Register / Login with persistent sessions
- Browse products with live search, category filters & pagination
- Product detail page with star ratings and customer reviews
- Persistent shopping cart (localStorage) with auto-calculated totals
- Multi-step checkout — Shipping → Payment → Review → Confirm
- Order history and real-time status tracking
- 🌙☀️ Dark / Light mode toggle with smooth animations

### 👑 Admin
- Dashboard with revenue, orders, products & user stats
- Full product CRUD (create, edit, delete, image preview)
- Order management with inline status updates
- Role-based access control (admin/user)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6 |
| **State** | Context API + useReducer |
| **HTTP** | Axios with JWT interceptor |
| **Backend** | Node.js, Express.js (MVC) |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | JWT + bcryptjs |
| **Styling** | Vanilla CSS (Dark Pastel Design System) |

---

## 📁 Project Structure

```
shopez/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # userController, productController, orderController
│   ├── middleware/      # authMiddleware, errorMiddleware
│   ├── models/          # User, Product, Order schemas
│   ├── routes/          # userRoutes, productRoutes, orderRoutes
│   ├── utils/           # generateToken (JWT)
│   ├── seeder.js        # Seed demo data
│   └── server.js        # Express entry point
└── frontend/
    └── src/
        ├── api/         # Axios config + JWT interceptor
        ├── components/  # Navbar, Footer, ProductCard, ThemeToggle, Guards
        ├── context/     # AuthContext, CartContext, ThemeContext
        └── pages/       # All pages + admin/
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/shopez.git
cd shopez
```

---

### 2️⃣ Install all dependencies (one command)

**Windows (PowerShell):**
```powershell
cd backend; npm install; cd ../frontend; npm install; cd ..
```

**Mac / Linux:**
```bash
cd backend && npm install && cd ../frontend && npm install && cd ..
```

---

### 3️⃣ Configure environment variables

Create a `.env` file inside the `backend/` folder:

```bash
# Windows
copy backend\.env.example backend\.env

# Mac/Linux
cp backend/.env.example backend/.env
```

Then open `backend/.env` and fill in your values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopez?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string_here_make_it_strong
CLIENT_URL=http://localhost:5173
```

> 💡 **Getting your MONGO_URI:**
> 1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) → Create free cluster
> 2. Click **Connect** → **Drivers**
> 3. Copy the connection string and replace `<username>` and `<password>`
> 4. Add `/shopez` before the `?` in the URI

---

### 4️⃣ Seed demo data

```bash
cd backend
node seeder.js
```

Output:
```
✅ Users + Products seeded!
👑 Admin  →  admin@shopez.com  /  admin123
👤 User   →  john@shopez.com   /  john1234
```

---

### 5️⃣ Run the application

Open **two terminals**:

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
```
> Runs on http://localhost:5000

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```
> Runs on http://localhost:5173

---

### ✅ Verify it's working

| Check | URL |
|-------|-----|
| Backend health | http://localhost:5000/api/health |
| Products API | http://localhost:5000/api/products |
| Frontend | http://localhost:5173 |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@shopez.com` | `admin123` |
| 👤 User | `john@shopez.com` | `john1234` |

> **To access Admin Panel:** Login as admin → click your name in the navbar → **Admin Panel**

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/users/register` | Public |
| `POST` | `/api/users/login` | Public |
| `GET` | `/api/users/profile` | Private |
| `PUT` | `/api/users/profile` | Private |

### Products
| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/products?keyword=&category=&page=` | Public |
| `GET` | `/api/products/top` | Public |
| `GET` | `/api/products/:id` | Public |
| `POST` | `/api/products` | Admin |
| `PUT` | `/api/products/:id` | Admin |
| `DELETE` | `/api/products/:id` | Admin |
| `POST` | `/api/products/:id/reviews` | Private |

### Orders
| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/orders` | Private |
| `GET` | `/api/orders/myorders` | Private |
| `GET` | `/api/orders/:id` | Private |
| `PUT` | `/api/orders/:id/pay` | Private |
| `GET` | `/api/orders` | Admin |
| `PUT` | `/api/orders/:id/status` | Admin |

---

## 👑 Setting Admin Access

After registering a new account:
1. Go to **MongoDB Atlas** → Browse Collections → `users`
2. Find your user document
3. Set `isAdmin: true`
4. Refresh the app

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` (backend) | Start backend with nodemon |
| `npm run dev` (frontend) | Start Vite dev server |
| `node seeder.js` | Seed demo products + users |
| `node seeder.js -d` | Destroy all data |

---

## 📄 License

MIT © 2024 ShopEZ — Built with ❤️ using the MERN Stack
