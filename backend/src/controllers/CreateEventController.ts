import { Request, Response } from "express";
import { CreateEventService } from "../services/CreateEventService";

class CreateEventController {
  async handle(req: Request, res: Response) {

    const { description, beginningDate, endingDate} = req.body;

    const relatedUserId = req.userId

    const createEventService = new CreateEventService();

    const event = await createEventService.execute({
      description,
      beginningDate,
      endingDate,
      relatedUserId,
    });

    return res.json(event);
  }
}

export { CreateEventController };
