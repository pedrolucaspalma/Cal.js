import { Request, Response } from "express"
import { DeleteEventService } from "../services/DeleteEventService";

class DeleteEventController{
    async handle(req: Request, res: Response){
        const { id }  = req.body

        const deleteEventService = new DeleteEventService();

        const deleteEvent = await deleteEventService.execute(id)

        return res.json(deleteEvent)
    }
}

export { DeleteEventController }