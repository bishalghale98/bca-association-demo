import eventRegistration from "./eventRegistration.controller";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
    return eventRegistration.registerEvent(req);
}


export function GET(req: NextRequest) {
    return eventRegistration.getAllRegisterEvent(req);
}


export function PUT(req: NextRequest) {
    return eventRegistration.updateEventAttendance(req);
}