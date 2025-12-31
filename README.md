# User Management System (Backend Intern Assessment)

## Overview
A full-stack user management system with authentication, role-based access control (Admin/User), and user lifecycle management. Admins can manage users, while users can manage their own profiles.

## Tech Stack
- Backend: Node.js, Express
- Frontend: React (Vite)
- Database: MongoDB Atlas
- Authentication: JWT
- Password Hashing: bcrypt
- Testing: Jest, Supertest
- Deployment:
  - Backend: Render
  - Frontend: Vercel

## Features
- User signup & login
- JWT-based authentication
- Role-based access (Admin/User)
- Admin can view, activate, and deactivate users
- Users can view and update profile
- Protected routes
- Backend unit tests

## Environment Variables
(Values not included)

Backend:
- MONGO_URI
- JWT_SECRET
- NODE_ENV

## API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### User
- GET /api/user/me
- PUT /api/user/profile

### Admin
- GET /api/admin/users
- PATCH /api/admin/users/:id/activate
- PATCH /api/admin/users/:id/deactivate

## Deployment Links
- Frontend: https://user-management-system-assessement.vercel.app
- Backend: https://user-management-backend-9ezf.onrender.com

## Testing
Backend tests implemented using Jest and Supertest.

## Author
Saqlain Shaik
