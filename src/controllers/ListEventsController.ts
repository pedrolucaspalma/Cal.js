import {Request, Response} from "express"
import{ ListEventsService } from "../services/ListEventsService"
import { CreateEventController } from "./CreateEventController"

class ListEventsController {
    async handle(req: Request, res: Response){
        const { relatedUserId } = req.body

        const listEventsService = new ListEventsService()

        const eventList = await listEventsService.execute(relatedUserId)

        return res.json(eventList)
    }
}

export { ListEventsController }