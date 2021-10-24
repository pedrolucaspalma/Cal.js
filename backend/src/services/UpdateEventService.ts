import { Prisma } from ".prisma/client"

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

interface IEventRequest {
    description: string;
    beginningDate: string;
    endingDate: string;
    relatedUserId: Number;
    eventId: Number;
}

class UpdateEventService {
    async execute({description, beginningDate, endingDate, relatedUserId, eventId}: IEventRequest){
        console.log(description)
        console.log(eventId)
        console.log(beginningDate)
        console.log(endingDate)
        console.log(relatedUserId)

        const updatedEvent = await prisma.event.update({
            where:{
                id: eventId
            },
            data: {
                description:description,
                beginningDate: beginningDate,
                endingDate: endingDate
            }
        })

        return updatedEvent
    }
}

export { UpdateEventService }