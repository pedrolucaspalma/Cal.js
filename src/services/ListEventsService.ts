const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IEventsRequest{
    relatedUserId: Number
}

class ListEventsService{
    async execute({relatedUserId}: IEventsRequest){
        console.log(relatedUserId)
        const eventSet = await prisma.event.findUnique({
            where: {
                relatedUserId: relatedUserId
            }
        })
        console.log(eventSet)
    }
}

export { ListEventsService }