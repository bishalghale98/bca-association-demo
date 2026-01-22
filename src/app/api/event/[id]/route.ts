import eventController from "../event.controller";

export async function PATCH(req: Request, res: Response, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return eventController.updateEvent(req, id);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return eventController.deleteEvent(req, id);
}
