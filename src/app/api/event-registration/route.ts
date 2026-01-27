import eventRegistration from "./eventRegistration.controller";

export function POST(req: Request) {
    return eventRegistration.registerEvent(req);
}


export function GET(req: Request) {
    return eventRegistration.getAllRegisterEvent(req);
}


export function PATCH(req: Request) {
    return eventRegistration.updateEventAttendance(req);
}