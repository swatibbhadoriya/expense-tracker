# Expense Tracker Application

This is a simple app built with React on the frontend and Node.js on the backend, using Axios for communication between the client and server. The app allows users to log in, track their expenses, and visualize data using charts.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)

---

## Overview

This Expense Tracker application is to help users manage and track their expenses. After logging in, users can:

- View a visual breakdown of their expenses.
- Filter the expenses by date (daily, weekly, monthly, or yearly).
- View charts for various data, such as category distribution, monthly expenses, and spending trends.

---

## Architecture

This application follows a client-server architecture:

1. Frontend (React): 
   - Handles the user interface and interactions.
   - Displays charts and handles user inputs.
   - Makes HTTP requests to the backend using Axios to fetch and submit data.

2. Backend (Node.js / Express):
   - Handles user authentication (login/signup) with JWT (JSON Web Tokens).
   - Manages expense-related data, storing it in MongoDB.
   - Exposes a REST API to interact with the frontend.

---

## Tech Stack

### Frontend:
- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for making API requests.
- Recharts: A library to render interactive charts.
- React-Router: For client-side routing and navigation.
- React-Toastify: For showing toast notifications.

### Backend:
- Node.js: JavaScript runtime for building the server.
- Express: A lightweight web framework for Node.js.
- MongoDB: A NoSQL database used to store user data and expenses.
- JWT (JSON Web Tokens): For user authentication and session management.

---

## Features

Here are the key features of the application:

- User Authentication: 
  - Login and signup functionality using JWT for secure authentication.
  
- Expense Management:
  - Users can add and view their expenses.
  - Expenses are categorized (e.g., food, rent, transport).

- Charts & Visualizations:
  - Pie Chart for category distribution.
  - Bar Chart for monthly expenses.
  - Line Chart for expense trends.
  - Area Chart for spending patterns.

- Expense Filters:
  - Users can filter their expenses by today, this week, this month, or this year.

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version >= 14)
- MongoDB (either running locally or via MongoDB Atlas)
- npm (which comes with Node.js)

### Steps to Run the Application:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:

   - Frontend:
     Navigate to the `client` directory and install the frontend dependencies:
     ```bash
     cd client
     npm install
     ```

   - Backend:
     Navigate to the `server` directory and install the backend dependencies:
     ```bash
     cd ../server
     npm install
     ```

3. Configure Environment Variables:

   - In the `server` directory, create a `.env` file and add the following configuration:
     ```env
     MONGO_URI=mongodb://localhost:27017/expense-tracker
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

   - Replace `MONGO_URI` with your MongoDB connection string if you’re using MongoDB Atlas.

4. Run the Application:

   - Start the Backend:
     In the `server` directory, run:
     ```bash
     npm start
     ```

   - Start the Frontend:
     In the `client` directory, run:
     ```bash
     npm start
     ```

   Your backend will be running on `http://localhost:5000`, and the frontend will be accessible at `http://localhost:3000`.

---

## Running the Application

Once you have everything set up:

1. Open `http://localhost:3000` in your browser.
2. Log in with your credentials (email and password).
3. After logging in, you will be redirected to the dashboard.
4. On the dashboard, you can view your expense data and filter it by various time frames (daily, weekly, monthly, yearly).

---

## Folder Structure

Here’s the folder structure of the project:

```
expense-tracker/
├── client/              # React frontend code
│   ├── public/          # Static files
│   ├── src/             # Source code
│   └── package.json     # Frontend dependencies
├── server/              # Node.js backend code
│   ├── Controllers/     # API controllers
│   ├── Middlewares/     # Custom middlewares for authentication
│   ├── Models/          # MongoDB models (User, Expense)
│   ├── Routes/          # API routes
│   ├── util/            # Utility functions
│   ├── .env             # Environment variables
│   └── package.json     # Backend dependencies
├── README.md            # This file
└── package.json         # Root package file
```

---

## API Endpoints

### 1. POST /login
   - Description: Log in a user.
   - Request Body: 
     ```json
     {
       "email": "user@example.com",
       "password": "password"
     }
     ```
   - Response: Returns a JWT token for authentication.

### 2. POST /signup
   - Description: Register a new user.
   - Request Body: 
     ```json
     {
       "username": "username",
       "email": "user@example.com",
       "password": "password"
     }
     ```
   - Response: Returns a success message.

### 3. GET /expenses
   - Description: Get all expenses for the logged-in user.
   - Response:
     ```json
     [
       {
         "category": "Food",
         "description": "description",
         "amount": 50,
         "date": "2022-08-10T00:00:00.000Z"
       },
       ...
     ]
     ```

---