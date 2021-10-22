import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({email, password})

        return res.header("access_token", token).status(200).json()
        // return res.json(token)
    }
}

export { AuthenticateUserController }