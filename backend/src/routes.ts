import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController"; //não usa
import { CreateEventController } from "./controllers/CreateEventController"; // ajustado
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"; //ajustado
import { ListEventsController } from "./controllers/ListEventsController"; //ajustado
import { DeleteEventController } from "./controllers/DeleteEventController";
import { UpdateEventController } from "./controllers/UpdateEventController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createEventController = new CreateEventController();
const authenticateUserController = new AuthenticateUserController();
const listEventsController = new ListEventsController();
const deleteEventController = new DeleteEventController();
const updateEventController = new UpdateEventController();

router.post("/users", createUserController.handle);
router.post("/events", ensureAuthenticated, createEventController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/updateevents", updateEventController.handle);

router.get("/userevents/", ensureAuthenticated, listEventsController.handle);

router.delete("/events/:id", deleteEventController.handle);


export { router };
