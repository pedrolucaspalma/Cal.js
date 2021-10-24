import { Request, Response } from "express"
import { UpdateEventService } from "../services/UpdateEventService"

class UpdateEventController{
    async handle(req: Request, res: Response){
        console.log(req.body)
        const { description, beginningDate, endingDate } = req.body;

        const relatedUserId = parseInt(req.body.relatedUserId)

        const eventId = parseInt(req.body.eventId)

        const updateEventService = new UpdateEventService();

        const updatedEvent = await updateEventService.execute({description,beginningDate,endingDate,relatedUserId,eventId});
        
        return res.json(updatedEvent)
    }

}

export { UpdateEventController};