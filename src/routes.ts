import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"
import { CreateEventController } from "./controllers/CreateEventController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

const router = Router()

const createUserController = new CreateUserController();
const createEventController = new CreateEventController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle)
router.post("/events", ensureAuthenticated, createEventController.handle)
router.post("/login", authenticateUserController.handle)

export { router }