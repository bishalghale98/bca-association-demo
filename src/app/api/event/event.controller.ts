import { prisma } from "@/lib/db";
import { eventApiSchema } from "@/schema/event/createEvent";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import { ZodError } from "zod";

class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      const body = await req.json();

      // 🔐 Zod validation
      const data = eventApiSchema.parse(body);

      const event = await prisma.event.create({
        data: {
          title: data.title,
          description: data.description,
          location: data.location,
          eventDate: data.eventDate,
          createdById: session.user.id,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: event,
        },
        { status: 201 },
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { success: false, errors: error.flatten().fieldErrors },
          { status: 422 },
        );
      }

      if (error instanceof Error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { success: false, error: "Something went wrong" },
        { status: 500 },
      );
    }
  }

  async getAllEvents(req: Request) {
    try {
      // ✅ Get session
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      // ✅ Fetch all events from Prisma
      const events = await prisma.event.findMany({
        orderBy: { eventDate: "asc" }, // optional: sort by date
      });

      // ✅ Return successful response
      return NextResponse.json(
        {
          success: true,
          data: events,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("getAllEvents error:", error);

      return NextResponse.json(
        {
          success: false,
          error: (error as Error).message || "Something went wrong",
        },
        { status: 500 },
      );
    }
  }
}

const eventController = new EventController();
export default eventController;
