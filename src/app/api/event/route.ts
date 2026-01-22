import eventController from "./event.controller";

export function POST(req: Request, res: Response) {
  return eventController.createEvent(req);
}

export function GET() {
  return eventController.getAllEvents();
}
