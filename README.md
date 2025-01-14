# Paytm - Basic Payment App

A full-stack payment application "Paytm" where users can sign in or sign up, transfer money from one account to another, and have their transactions stored securely in MongoDB, adhering to ACID principles. The project is built using **ReactJS** for the frontend, **Express** for the backend, and **MongoDB** for data storage.

## Features

- **User  Authentication:**
  - Users can sign up and log in using JWT-based authentication.
  - JWT tokens are generated and verified for secure user sessions.

- **Money Transfer:**
  - Users can transfer money between accounts.
  - Transactions are recorded in the database securely.

- **ACID-compliant Transactions:**
  - MongoDB transactions are implemented to ensure atomicity, consistency, isolation, and durability (ACID) during money transfers.

## To Run This Locally

### 1. To Run Backend

```bash
cd paytm/backend
npm install
```

### Set up environment variables by creating a .env file in the backend directory and add the following variables:

```bash 
MONGO_URI=<your_mongo_db_connection_string>
PORT=<your_desired_port>
```

### Run the application
``` bash
nodemon index.js 
```

### 2. To Run frontend
``` bash 
cd paytm/frontend
npm install
npm run dev
```
