# eCommerce Platform Fullstack application React.js application with Node.js, Express.js & MongoDB (MERN)

## API endpoints (Products)

- http://localhost:5000/api/products/ (GET all Products)
- http://localhost:5000/api/products/:id (GET product id)

## API endpoints (Users)

- http://localhost:5000/api/users/auth (POST Auth/login user)
- http://localhost:5000/api/users (POST Register new user)
- http://localhost:5000/api/users/logout (POST Logout user)
- http://localhost:5000/api/users/profile (GET user profile)
- http://localhost:5000/api/users/profile (Put update user profile)

## API endpoints (Users) Admin routes

- http://localhost:5000/api/users (GET all users)
- http://localhost:5000/api/users/:id (GET user by id)
- http://localhost:5000/api/users/:id (DELETE user by id)
- http://localhost:5000/api/users/:id (PUT update user by id)

## Installation of needed Packages for backend and frontend (npm or yarn)

- npm i
- cd frontend
- npm i

## Clean and build backend into dist folder

- npm run clean
- npm run build:backend

# Run frontend (localhost:3000) & backend (localhost:5000)

- npm run dev

## Run backend only (localhost:5000)

- npm run start
- npm run server (nodemon)

## Run frontend only (localhost:3000)

- npm run client

## Seed Database (sample data)

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## Documents (Test with sandbox account)

- https://cloud.mongodb.com/v2/603dd7dae7fe52106d709f2f#/metrics/replicaSet/63e17ec63675386142104a41/explorer/proshop
- https://redux-toolkit.js.org/
- https://developer.paypal.com/api/nvp-soap/payflow/integration-guide/test-transactions/
- https://developer.paypal.com/dashboard/accounts

## Usage

- **Create a MongoDB database and obtain your MongoDB URI [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)**
- **Create a PayPal account and obtain your Client ID from [PayPal Developer](https://developer.paypal.com/home/)**

## Environment variables .env file

- **PAYPAL_CLIENT_ID=**
- **JWT_SECRET=**
- **MONGO_URI**=mongodb+srv://{username}:{password}@{username}.jb7l6.mongodb.net/{database}

- **NODE_ENV=**
- **PAGINATION_LIMIT=**
- **PORT=**
