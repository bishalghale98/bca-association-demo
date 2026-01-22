import z from "zod";

export const eventUpdateApiSchema = z
    .object({
        title: z
            .string()
            .min(2, "Title must be at least 2 characters.")
            .max(100, "Title must not exceed 100 characters.")
            .optional(),

        description: z
            .string()
            .max(500, "Description must not exceed 500 characters.")
            .optional(),

        location: z
            .string()
            .max(200, "Location must not exceed 200 characters.")
            .optional(),

        type: z.string().optional(),

        // Single-day event
        eventDate: z
            .string()
            .optional()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
                message: "Invalid event date",
            })
            .transform((val) => (val ? new Date(val) : undefined)),

        // Multi-day event
        startDate: z
            .string()
            .optional()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
                message: "Invalid start date",
            })
            .transform((val) => (val ? new Date(val) : undefined)),

        endDate: z
            .string()
            .optional()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
                message: "Invalid end date",
            })
            .transform((val) => (val ? new Date(val) : undefined)),
    })
    .refine(
        (data) => {
            // If one of start/end is provided, both must be
            if (
                (data.startDate && !data.endDate) ||
                (!data.startDate && data.endDate)
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                "Both startDate and endDate must be provided for a multi-day event",
            path: ["startDate", "endDate"],
        },
    )
    .refine(
        (data) => {
            // endDate must be after startDate
            if (data.startDate && data.endDate) {
                return data.endDate > data.startDate;
            }
            return true;
        },
        {
            message: "endDate must be after startDate",
            path: ["endDate"],
        },
    )
    .refine(
        (data) => {
            // Event date must be in the future if provided
            if (data.eventDate) {
                return data.eventDate > new Date();
            }
            return true;
        },
        {
            message: "Event date must be in the future",
            path: ["eventDate"],
        },
    );

export type EventUpdateApiInput = z.infer<typeof eventUpdateApiSchema>;
