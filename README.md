# eCommerce Platform Fullstack application React.js application with Node.js, Express.js & MongoDB (MERN)

## API endpoints (Products)

- http://localhost:5000/api/products/		(GET all Products)
- http://localhost:5000/api/products/:id	(GET product id)

## API endpoints (Users)

- http://localhost:5000/api/users/auth 		(POST Auth/login user)
- http://localhost:5000/api/users			(POST Register new user)
- http://localhost:5000/api/users/logout	(POST Logout user)
- http://localhost:5000/api/users/profile 	(GET user profile)
- http://localhost:5000/api/users/profile 	(Put update user profile)

## API endpoints (Users) Admin routes
- http://localhost:5000/api/users		(GET all users)
- http://localhost:5000/api/users/:id	(GET user by id)
- http://localhost:5000/api/users/:id	(DELETE user by id)
- http://localhost:5000/api/users/:id	(PUT update user by id)

## Start in backend (localhost:5000)
- npm run start

## Start in backend localhost:3000
- npm run client

## Start frontend (localhost:3000) and backend (localhost:5000)  
- npm run dev (nodemon)

## Installation of needed Packages for back-end (npm or yarn)
- npm i (backend folder)
- npm i (frontend folder)
- npm i (root)

## Environment variables
- mkdir in root directory config 
- inside source folder create file .env (touch .env)

## .env file
- JWT_SECRET=
- MONGO_URI=mongodb+srv://{username}:{password}@{username}.jb7l6.mongodb.net/{database}
- NODE_ENV=development
- PORT = 5000
