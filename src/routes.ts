import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"
import { CreateEventController } from "./controllers/CreateEventController"

const router = Router()

const createUserController = new CreateUserController()
const createEventController = new CreateEventController()

router.post("/users", createUserController.handle)
router.post("/events", createEventController.handle)

export { router }