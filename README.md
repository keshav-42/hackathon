# Notes App

A full-stack CRUD application for managing personal notes with user authentication.

## Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router DOM
- Material-UI
- Axios

## Setup Instructions

### Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Create a database named 'notesapp'

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with your database configuration:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=notesapp
   DB_PASSWORD=postgres
   DB_PORT=5432
   JWT_SECRET=your-super-secret-key-change-this-in-production
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features
- User registration and authentication
- Create, read, update, and delete notes
- Secure API endpoints with JWT
- Responsive design
- Modern UI with Material-UI components

## API Endpoints

### Authentication
- POST /api/register - Register a new user
- POST /api/login - Login user

### Notes
- GET /api/notes - Get all notes for authenticated user
- POST /api/notes - Create a new note
- PUT /api/notes/:id - Update an existing note
- DELETE /api/notes/:id - Delete a note
