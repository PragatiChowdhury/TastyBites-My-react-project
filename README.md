# TastyBites Restaurant Management System

MERN Stack Restaurant Management System based on the supplied project specification.

## Features
- User registration/login with JWT
- Admin login and protected dashboard
- Admin CRUD for menu items
- Admin user management
- Public menu browsing without login
- Menu item details
- Image URL support (the API also accepts a normal image URL)
- Responsive React UI
- MongoDB + Mongoose + Express REST API

## Project structure
- `backend/` - Node.js + Express + MongoDB API
- `frontend/` - React + Vite UI

## Run
### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create a MongoDB database and put its connection string in `backend/.env`.

For the first admin, either register a normal user and promote it to `admin` directly in MongoDB, or use the optional `ADMIN_EMAIL` / `ADMIN_PASSWORD` seed variables and run:
```bash
npm run seed:admin
```
