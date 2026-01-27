import { prisma } from "@/lib/db";
import { eventApiSchema } from "@/schema/event/createEvent";
import { eventUpdateApiSchema } from "@/schema/event/updateEvent";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import { UserRole } from "@/types/user/enums";

class EventController {
  // ================= CREATE =================
  async createEvent(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const body = await req.json();
      const parsed = eventApiSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          {
            success: false,
            errors: parsed.error.flatten().fieldErrors
          },
          { status: 422 }
        );
      }

      const event = await prisma.event.create({
        data: {
          ...parsed.data,
          createdById: session.user.id,
        },
      });

      return NextResponse.json(
        { success: true, data: event },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 500 }
      );
    }
  }

  // ================= READ =================
  async getAllEvents() {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const events = await prisma.event.findMany({
        orderBy: { eventDate: "asc" },
      });

      return NextResponse.json(
        { success: true, data: events },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch events" },
        { status: 500 }
      );
    }
  }

  // ================= UPDATE =================
  async updateEvent(req: NextRequest, id: string) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const event = await prisma.event.findUnique({ where: { id } });

      if (!event) {
        return NextResponse.json(
          { success: false, message: "Event not found" },
          { status: 404 }
        );
      }

      if (
        session.user.role !== UserRole.SUPER_ADMIN &&
        event.createdById !== session.user.id
      ) {
        return NextResponse.json(
          { success: false, message: "Forbidden" },
          { status: 403 }
        );
      }

      const body = await req.json();
      const parsed = eventUpdateApiSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { success: false, errors: parsed.error.flatten().fieldErrors },
          { status: 422 }
        );
      }

      const updatedEvent = await prisma.event.update({
        where: { id },
        data: parsed.data,
      });

      return NextResponse.json(
        { success: true, data: updatedEvent },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Update failed" },
        { status: 500 }
      );
    }
  }

  // ================= DELETE =================
  async deleteEvent(req: NextRequest, id: string) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const event = await prisma.event.findUnique({ where: { id } });

      if (!event) {
        return NextResponse.json(
          { success: false, message: "Event not found" },
          { status: 404 }
        );
      }

      if (
        session.user.role !== UserRole.SUPER_ADMIN &&
        event.createdById !== session.user.id
      ) {
        return NextResponse.json(
          { success: false, message: "Forbidden" },
          { status: 403 }
        );
      }

      await prisma.event.delete({ where: { id } });

      return NextResponse.json(
        { success: true, message: "Event deleted successfully" },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Delete failed" },
        { status: 500 }
      );
    }
  }

  async getEvent(req: NextRequest, id: string) {
    try {
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please provide the id"
        }, {
          status: 404
        })
      }


      const event = await prisma.event.findUnique({
        where: {
          id
        }
      })

      if (!event) {
        return NextResponse.json({
          success: false,
          message: "No event found with that id"
        }, {
          status: 404
        })
      }


      return NextResponse.json({
        success: true,
        message: "Event successfully fetched",
        data: event
      })
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error while fetching" },
        { status: 500 }
      );
    }
  }
}

const eventController = new EventController();
export default eventController;
