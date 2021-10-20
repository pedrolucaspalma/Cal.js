import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"
import { CreateEventController } from "./controllers/CreateEventController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ListEventsController } from "./controllers/ListEventsController"

const router = Router()

const createUserController = new CreateUserController();
const createEventController = new CreateEventController();
const authenticateUserController = new AuthenticateUserController();
const listEventsController = new ListEventsController();

router.post("/users", createUserController.handle)
router.post("/events", ensureAuthenticated, createEventController.handle)
router.post("/login", authenticateUserController.handle)

router.get("/events", ensureAuthenticated, listEventsController.handle)

export { router }