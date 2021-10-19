import {Request, response, Response} from "express"
import { CreateUserService } from "../services/CreateUserService"

const createUser =  require("../services/CreateUserService")

class CreateUserController{
    async handle(req: Request, res: Response){
        const { name, password, email } = req.body

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, password })

        return res.json(user)
    }
}

export { CreateUserController }