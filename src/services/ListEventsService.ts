const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IEventsRequest{
    relatedUserId: Number
}

class ListEventsService{
    async execute({relatedUserId}: IEventsRequest){
        const eventSet = await prisma.eventSet.findUnique({
            where: {
                relatedUserId: relatedUserId
            }
        })
        console.log(eventSet)
    }
}

export { ListEventsService }