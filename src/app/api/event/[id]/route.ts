import { NextRequest } from "next/server";
import eventController from "../event.controller";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.updateEvent(req, id);
}



export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.deleteEvent(req, id);
}


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.getEvent(req, id);
}
