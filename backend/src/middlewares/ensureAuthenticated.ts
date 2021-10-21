import { Request, Response, NextFunction, response } from "express";
import { request } from "http";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(req:Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if(!authToken){
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    try{
        const {sub} = verify(token, "dfbbea8a502ceaebb95ad72d7b8866ac") as IPayload

        req.user_email = sub

        return next();
    } catch(err){
        return response.status(401).end();
    }
}