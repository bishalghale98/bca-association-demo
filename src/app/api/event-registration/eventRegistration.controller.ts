import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { eventRegistrationSchema } from "@/schema/eventRegistration/create";
import { Prisma } from "@/generated/prisma/client"; // or "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { UserRole } from "@/types/user/enums";

class EventRegistration {
    async registerEvent(req: Request) {
        try {
            const body = req.json();

            const parsed = eventRegistrationSchema.safeParse(body);

            if (!parsed.success) {
                return NextResponse.json(
                    {
                        success: false,
                        errors: parsed.error.flatten().fieldErrors,
                    },
                    { status: 422 }
                );
            }

            const registration = await prisma.eventRegistration.create({
                data: {
                    fullName: parsed.data.name,
                    phone: parsed.data.phone,
                    message: parsed.data.message,
                    eventId: parsed.data.eventId,
                    userId: parsed.data.userId,
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Event registered successfully",
                    data: registration,
                },
                { status: 201 }
            );
        } catch (error) {
            // Duplicate registration (eventId + userId unique)
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "You have already registered for this event",
                    },
                    { status: 409 }
                );
            }

            console.error("Event registration error:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "Internal server error",
                },
                { status: 500 }
            );
        }
    }

    async getAllRegisterEvent(req: Request) {
        try {

            const session = await getServerSession(authOptions);

            if (!session?.user?.id) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 }
                );
            }


            const myEvents = await prisma.eventRegistration.findMany({
                where: {
                    userId: session.user.id
                }
            })

            if (!myEvents) {
                return NextResponse.json({
                    success: false,
                    message: "You does not register in any events yet!!"
                }, {
                    status: 404
                })
            }

            return NextResponse.json({
                success: true,
                message: "Your registerd events",
                data: myEvents
            })

        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { success: false, message: "Failed to fetch events" },
                { status: 500 }
            );
        }
    }

    async updateEventAttendance(req: Request) {
        try {

            const session = await getServerSession(authOptions);

            if (!session) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 }
                );
            }

            if (
                session.user.role !== UserRole.ADMIN &&
                session.user.role !== UserRole.SUPER_ADMIN
            ) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 }
                );
            }

            const { attended, id } = await req.json()

            if (!attended || !id) {
                return NextResponse.json({
                    success: false,
                    message: "Please provide status of attended"
                })
            }

            const updateEventRegister = prisma.eventRegistration.update({
                where: {
                    id
                },
                data: {
                    attended,
                }
            })

            return NextResponse.json({
                success: true,
                message: "Attended updated successfully",
                data: updateEventRegister
            })



        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { success: false, message: "Failed to fetch events" },
                { status: 500 }
            );
        }
    }
}

const eventRegistration = new EventRegistration();
export default eventRegistration;
