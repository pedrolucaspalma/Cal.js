import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"

const router = Router()

const createUserController = new CreateUserController()

router.post("/users", createUserController.handle)
router.post("/events")

export { router }