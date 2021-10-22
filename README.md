# Cal.js
A personal events tracker fullstack web app

## Backend

### Intro
The backend can be illustrated as:

server.ts <-> routes.ts <-> someController.ts <-> someService.ts <-> Prisma Client <-> database.sqlite

In the following sections I will describe each part of the diagram above.

### server.ts
The server handles the HTPP request that comes from the client (frontend HTML/js pages) by fetch API and handles it to routes.ts. This request contains a HTPP method (in this app I only used GET, POST and DELETE) and, if it is a POST or DELETE method, a body. 

Then, routes.ts takes the request and calls the appropriate controller. Lets use `router.post("/users", createUserController.handle)`, for example. It expects to receive