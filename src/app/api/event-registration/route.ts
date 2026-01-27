import eventRegistration from "./eventRegistration.controller";

export function POST(req: Request) {
    return eventRegistration.registerEvent(req);
}


export function GET(req: Request) {
    return eventRegistration.getAllRegisterEvent(req);
}


export function PUT(req: Request) {
    return eventRegistration.updateEventAttendance(req);
}