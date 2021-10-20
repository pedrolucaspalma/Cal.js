const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface IDeleteRequest{
    id: Number;
}

class DeleteEventService{
    async execute(id: IDeleteRequest){
        const deleteEvent = await prisma.event.delete({
            where:{
                id: id
            }
        })
        return deleteEvent
    }
}

export { DeleteEventService }