import eventController from "./event.controller";

export function POST(req: Request, res: Response) {
  return eventController.createEvent(req, res);
}

export function GET(req: Request) {
  return eventController.getAllEvents(req);
}
