# Cal.js
A personal events tracker fullstack web app

## Installation and usage
1. Clone the project in your machine by using git clone or downloading it as a zip.
2. Open the project folder on terminal.
3. Inside Cal.js folder, run `cd backend` to change to backend folder.
4. Inside backend folder, run `npm install` to install the project dependencies.
5. Still inside the backend folder, run `npm run dev` to initialize the server.
6. Now, run `cd ../frontend/registration` to change to and open the index.html with your preferred browser 
7. And now you can begin using the application from there! 

## How does it work?

### Database

For the data storage, I used Prisma framework to handle creation, insertion and deletion of data, while SQLite is the chosen database.

You can find the model used in for database in the `prisma.schema` file and the `database.sqlite` both located in `backend/prisma`folder.

### Backend

#### Intro
The backend can be illustrated as:

server.ts <-> routes.ts <-> someController.ts <-> someService.ts <-> Prisma Client <-> database.sqlite

In the following sections I will describe each part of the diagram above.

#### server.ts
The server handles the HTPP request that comes from the client (frontend HTML/js pages) by fetch API and handles it to routes.ts. This request contains a HTPP method (in this app I only used `GET`, `POST` and `DELETE`), is directed to an endpoint (`/users`, `/events` or `/login`) and contains some data inside the body.

#### routes.ts
Routes.ts takes the request and calls the appropriate controller to handle the request.

#### someController.ts
In a general way, the controller is responsible for taking the data inside the request body, storing it inside some variables, and call the appropriate service while sending these variables to it as arguments.

#### someService.ts
The service will then do 


Lets use `router.post("/users", createUserController.handle)`, for example. It receives a `name`, an `email` and a `password` in the request body, then parses it and stores each value inside a variable, and send them