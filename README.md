# Cal.js
A personal events tracker fullstack web app

## Installation and usage
1. Clone the project in your machine by using git clone or downloading it as a zip.
2. Open the project folder on terminal.
3. Inside Cal.js folder, run `cd backend` to change to backend folder.
4. Inside backend folder, run `npm install` to install the project dependencies.
5. Still inside the backend folder, run `npm run dev` to initialize the server.
6. Now, run `cd ../frontend/registration` to change to and open the index.html with Google Chrome/Brave.  
7. And now you can begin using the application from there! 

OBS: Browser support is limited only to Chrome or Brave. Won't work on Firefox and I haven't tested on other browsers by now. 

## How does it work?

### Database

For the data storage, I used Prisma framework to handle creation, insertion and deletion of data, while SQLite is the chosen database.

You can find the model used in for database in the `prisma.schema` file and the `database.sqlite` both located in `backend/prisma`folder.

The model itself is pretty basic, containing only two related SQL entities: User and Event.

User entitie represents a single User, and it has the following properties:
* id [integer] Primary Key
* name [varchar]
* email [varchar]
* password [varchar] -> This is stored as a encrypted hash in the database

Event entitie represents a single Event, and it has the following properties:
* id [integer] Primary Key
* description [varchar]
* begginingDate [varchar]
* endingDate [varchar]
* relatedUserId [integer] User Foreign Key

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
The service may then use the Prisma Client to:

* Insert data in the database (If POST method).
* Retrieve data from the database (If GET method).
* Delete data from the database (If DELETE method)

The service will then return back to the controller whatever result they got from the operation (it could be either data or an Error object)

The controller will then return back a response parsed as a JSON back to the frontend client, that I will approach in the following section.

#### Request Example

Lets see a `POST` Request example, that contains `/users` as its endpoint, `POST` as its HTTP method and the following body:

    {
        name: Pedro,
        email: pedro@test.com,
        password: 1234
    }

The server receives this request, and sends it to Router. In the router, `router.post("/users", createUserController.handle)` is used to call the createUserController to handle the request.

Then, the controller receives `name`, `email` and `password` from the request body and stores each value inside a variable.Once it does that, it calls createUserService, and passes these variables as arguments.

The service will then check these values to see if any of them came empty. If anything came empty, it throws an Error.

If no Error is thrown, it uses Prisma client to method findUnique() to check if the table User has any User with the given `email`. If it does, it throws an Error.

If no Error is thrown, it now makes an insertion query with Prisma Client method create() to create a new User, with the given `name`, `email` and `password`. Then it returns the created User to the controller, that returns it as a HTTP Response parsed as a JSON to the client.

The other routes follow a similar approach to handle requests, described in the illustration:

server.ts <-> routes.ts <-> someController.ts <-> someService.ts <-> Prisma Client <-> database.sqlite

### Frontend

#### Introduction

The frontend of this application is composed of HTML pages, a single CSS stylesheet and Javascript files. Basically, the pages will send Requests to the backend via HTML tag `form` and Javascript fetch() API.

Throughout the application there will be several frontend data verifications before sending the request to the server. When something is wrong with the data that the user wants to send (IE: Not all fields were filled) it will set the equivalent `.alert-message` tag (identified by a specific ID) `visibility` CSS property to `visible`, explaining the error.

It may happen that the data sent from the user is valid, but the server throws an Error (IE: User tries to log in with unregistered credentials). The error thrown to the client will then activate the mecanism described above, changing an `.alert-message` visibility.

##### Registration

The user registration is made by sending the main form element values to the server, using a `POST` request (endpoint `/users`) through Javascript `fetch()` API.

One thing to mention here is that even though the password is stored a hash in the server and sent through a POST body (not appearing in the request URL), **it still is sent as plain text in the request body**. This is a security flaw, and should be addressed in the future, so until then **don't send personnal/sensitive information in this registration**.

Once the request is submited and no errors are thrown, the user is redirected to Login page.

##### Login

User login is made in a similar way, in the sense that form element values are sent using `POST` request (endpoint `/login`). In this case, if the login is succssesfull the server sends the client a response containing the user's Id on the database, that is stored in localStorage for future usage. If no errors are thrown, the user is redirected to Main page.

Later on I pretend to insert JWT authentication to this. It should work like this:
- The `/login` route controller/service will now also return a JWT on the response body.
- Once the token is received on the client via the server response, it is stored in localStorage or cookies.
- A new middleware will be included (ensureUserAuthenticated). ensureUserAuthenticated will be added in each existing route that uses a main functionality (Creating new events, editing events and listing events), being called before the main functionality controller. 
- This middleware will get a JWT from the request sent by the client and check if the token is valid. If it isn't, it throws an error that should redirect the client to the login page. 
- If it is valid, it calls the next controller to receive handle the request.

##### Main Page

###### On Login/Logout

- After the login, the app will have the user's Name and database ID stored on localStorage.
    - The user's name will only be used to be inserted in the greeting `h2` tag.
    - The user's database ID will be sent on every request to the server with the `GET` method and `/userevents/` endpoint, being passed on the URL. I will explain more of this request on the next section.
- The logout button simply clears the user's data on localStorage and redirect's him back to login page.

###### Listing events

Event listing is made by sending a request to the server with the `GET` method and `/userevents/` endpoint, being passed on the URL. This returns a response containing a list of events and each events respective ID. The events are then appended to the event list with Javascript DOM, and the page is reloaded.


###### Adding a new event

When the user clicks on the "Add new event" button, it calls a `openModalForInsertion()` function that simply opens up a modal containing a form. It also calls a `submitFormForInsertion()`, that adds uses `addEventListener` to the form and waits for the user to click on the green "Submit" button on the modal. On click, it collects all the information put on the form by the user, stores in the `formData` object and passes this object to `addEvent()` as a paramater. Add event simply passes this object again to the `sendEventInsertionRequest()`, that uses `fetch()` to send the object containing the new event to the server to handle with the `createEventController`. The page is then reloaded, and the user can now see the new event on the event list.

###### Editing an existing event
