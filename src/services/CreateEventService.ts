const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IEventRequest{
    description: string;
    beginningDate: string;
    endingDate: string;
    relatedSetId: Number;
}

class CreateEventService{
    async execute({description, beginningDate, endingDate, relatedSetId}: IEventRequest){
        const newEvent = await prisma.event.create({
            data:{
                description: description,
                beginningDate: beginningDate,
                endingDate: endingDate,
                relatedSet: {
                    connect: { id: relatedSetId }
                }
            }
        })
        return newEvent;
    }
}

export { CreateEventService }