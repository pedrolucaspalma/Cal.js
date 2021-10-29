import { Request, Response } from "express";
import { ListEventsService } from "../services/ListEventsService";

class ListEventsController {
  async handle(req: Request, res: Response) {
    const relatedUserId:number = req.userId

    const listEventsService = new ListEventsService();

    const eventList = await listEventsService.execute(relatedUserId);

    return res.json(eventList);
  }
}

export { ListEventsController };
