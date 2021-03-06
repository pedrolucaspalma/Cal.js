
import { Request, Response, NextFunction } from "express";
import {verify} from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ")

    try{

        const { sub } = verify(token ,"dfbbea8a502ceaebb95ad72d7b8866ac") as IPayload;

        const convertedId = parseInt(sub)

        request.userId = convertedId;

        return next();

    } catch(err){
        return response.status(401).end();
    }


}