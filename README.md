# Paytm - Basic Payment App

A full-stack payment application "Paytm" where users can sign in or sign up, transfer money from one account to another, and have their transactions stored securely in MongoDB, adhering to ACID principles. The project is built using **ReactJS** for the frontend, **Express** for the backend, and **MongoDB** for data storage.

## Features

- **User Authentication:**
  - Users can sign up and log in using JWT-based authentication.
  - JWT tokens are generated and verified for secure user sessions.

- **Money Transfer:**
  - Users can transfer money between accounts.
  - Transactions are recorded in the database securely.

- **ACID-compliant Transactions:**
  - MongoDB transactions are implemented to ensure atomicity, consistency, isolation, and durability (ACID) during money transfers.

## To run this locally 

2. **To run backend**
- cd paytm/backend
-  npm install
- Set up environment variables by creating a .env file and in the backend directory add **MONGO_URI** and **PORT** to it 
- at last run nodemon index.js

2. **To run frontend**
- cd paytm/frontend
-  npm install
-  npm run dev