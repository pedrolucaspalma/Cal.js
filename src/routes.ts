import { Router } from "express"

const router = Router()

const createUserController = new CreateUserController()

router.post("/users", createUserController.handle)

export { router }