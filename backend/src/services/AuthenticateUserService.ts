import { Prisma } from ".prisma/client"

const { compare } = require ("bcryptjs")
const { sign } = require ("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({ email, password }:IAuthenticateRequest ){
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("Incorrect Email/Password")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Incorrect Email/Password")
        }

        const token = sign({email: user.email}, 'dfbbea8a502ceaebb95ad72d7b8866ac', {subject: user.email, expiresIn: "1d"});
        
        return token;
    }
}

export {AuthenticateUserService}