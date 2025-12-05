# 🛒 RealShop - E-commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication** - Register/Login with JWT
- **Role-Based Access** - Admin and Client roles
- **Product Management** - Add, edit, delete products (Admin)
- **Shopping Cart** - Add to cart, manage quantities
- **Order Management** - Place orders, track status
- **Image Upload** - Cloudinary integration for product images
- **Bill Upload** - Upload order bills (Admin)
- **Advertisement System** - Manage homepage carousel ads

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
```

Run backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder (optional for local dev):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set Root Directory to `frontend`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
5. Deploy!

### Backend (Render)
1. Create new Web Service in Render
2. Connect GitHub repository
3. Set Root Directory to `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add all environment variables from `.env`
7. Deploy!

## 📝 License

MIT
