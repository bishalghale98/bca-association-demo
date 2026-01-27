import { NextRequest } from "next/server";
import eventController from "../event.controller";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    return eventController.updateEvent(req, id);
}



export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    return eventController.deleteEvent(req, id);
}


export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    return eventController.getEvent(req, id);
}
