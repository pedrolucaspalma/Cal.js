const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ListEventsService {
  async execute(relatedUserId: number) {
    console.log(relatedUserId)

    const eventList = await prisma.event.findMany({
      where: {
        relatedUserId: relatedUserId,
      },
    });

    return eventList;
  }
}

export { ListEventsService };
