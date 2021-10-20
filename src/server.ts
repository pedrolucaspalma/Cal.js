import express, { Request, Response, NextFunction, response} from "express";
import { request } from "http";

import { router } from "./routes";

const app = express()

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
})

const server = app.listen(3000, () => console.log("Server is running"))