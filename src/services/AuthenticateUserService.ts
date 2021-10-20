import { Prisma } from ".prisma/client"

const { compare } = require ("bcryptjs")
const { sign } = require ("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

interface IAuthenticateRequest {
    email: string;
    password: string;
}

// Verificar se o email existe (Armazenando o usuário encontrado em uma variável)
    // Se não existir, retornar erro
// Verificar se a senha passada bate com a senha do BD (comparar hashes)
    // Se não bater, retornar erro
// Gerar token

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

        const token = sign({email: user.email}, "dfbbea8a502ceaebb95ad72d7b8866ac", {subject: user.id, expiresIn: "1d"});
        
        return token;
    }
}

export {AuthenticateUserService}