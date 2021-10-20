const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IEventsRequest{
    relatedUserId: Number
}

class ListEventsService{

    async execute(relatedUserId : IEventsRequest){
        console.log(relatedUserId)

        const eventList = await prisma.event.findMany({
            where: {
                relatedUserId: relatedUserId
            }
        })

        return eventList
    }
}

export { ListEventsService }