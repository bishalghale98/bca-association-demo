import eventController from "./event.controller";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  return eventController.createEvent(req);
}

export function GET() {
  return eventController.getAllEvents();
}
