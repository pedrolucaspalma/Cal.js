import { Request } from "express"

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = async (name: string, password: string, email: string) =>{

    if(!email){
        throw new Error("Email empty")
    }

    if(!name){
        throw new Error("Name empty")
    }

    if(!password){
        throw new Error("Password empty")
    }

    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(userAlreadyExists){
        throw new Error("User already exists")
    }

    const newUser = await prisma.user.create({
        data:{
            name : name,
            password: password,
            email: email
        }
    })
    
    return newUser
}