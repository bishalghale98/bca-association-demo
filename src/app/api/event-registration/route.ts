import eventRegistration from "./eventRegistration.controller";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
    return eventRegistration.registerEvent(req);
}


export function GET(req: NextRequest) {

    const eventId = req.nextUrl.searchParams.get("eventId");

    if (eventId) {
        return eventRegistration.getRegistrationsByEventId(req, eventId);
    }


    return eventRegistration.getAllRegisterEvent(req);
}


export function PATCH(req: NextRequest) {
    return eventRegistration.updateEventAttendance(req);
}