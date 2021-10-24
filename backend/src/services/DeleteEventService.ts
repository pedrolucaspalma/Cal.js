const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DeleteEventService {
  async execute(id: number) {
    const deleteEvent = await prisma.event.delete({
      where: {
        id: id,
      },
    });
    return deleteEvent;
  }
}

export { DeleteEventService };
