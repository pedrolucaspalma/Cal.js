import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"
import { CreateEventController } from "./controllers/CreateEventController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"

const router = Router()

const createUserController = new CreateUserController();
const createEventController = new CreateEventController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle)
router.post("/events", createEventController.handle)
router.post("/login", authenticateUserController.handle)

export { router }