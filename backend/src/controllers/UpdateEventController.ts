import { Request, Response } from "express"
import { UpdateEventService } from "../services/UpdateEventService"

class UpdateEventController{
    async handle(req: Request, res: Response){
        const { description, beginningDate, endingDate } = req.body;

        const relatedUserId = req.userId

        const eventId = parseInt(req.body.eventId)

        const updateEventService = new UpdateEventService();

        const updatedEvent = await updateEventService.execute({description,beginningDate,endingDate,relatedUserId,eventId});
        
        return res.json(updatedEvent)
    }

}

export { UpdateEventController};