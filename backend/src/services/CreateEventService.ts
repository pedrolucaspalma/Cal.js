const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IEventRequest{
    description: string;
    beginningDate: string;
    endingDate: string;
    relatedUserId: Number;
}

class CreateEventService{
    async execute({description, beginningDate, endingDate, relatedUserId}: IEventRequest){

        if(!description){
                throw new Error("Invalid event. Please fill all camps.")
        }
        if(!beginningDate){
            throw new Error("Invalid event. Please fill all camps.")
        }
        if(!endingDate){
            throw new Error("Invalid event. Please fill all camps.")
        }

        const newEvent = await prisma.event.create({
            data:{
                description: description,
                beginningDate: beginningDate,
                endingDate: endingDate,
                relatedUser: {
                    connect: { id: relatedUserId }
                }
            }
        })
        return newEvent;
    }
}

export { CreateEventService }