import express, { Request, Response, NextFunction} from "express";

import { router } from "./routes";

const app = express()

app.use(express.json())

app.use(router)

const server = app.listen(3000, () => console.log("Server is running"))