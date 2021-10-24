import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateEventController } from "./controllers/CreateEventController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListEventsController } from "./controllers/ListEventsController";
import { DeleteEventController } from "./controllers/DeleteEventController";

const router = Router();

const createUserController = new CreateUserController();
const createEventController = new CreateEventController();
const authenticateUserController = new AuthenticateUserController();
const listEventsController = new ListEventsController();
const deleteEventController = new DeleteEventController();

router.post("/users", createUserController.handle);
router.post("/events", createEventController.handle);
router.post("/login", authenticateUserController.handle);

router.get("/userevents/:relatedUserId", listEventsController.handle);

router.delete("/events/:id", deleteEventController.handle);

export { router };
