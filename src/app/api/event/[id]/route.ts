import eventController from "../event.controller";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.updateEvent(req, id);
}



export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.deleteEvent(req, id);
}


export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return eventController.getEvent(req, id);
}
