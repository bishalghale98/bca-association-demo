import { z } from "zod";

export const eventRegistrationSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

    phone: z
        .string()
        .trim()
        .min(7, "Phone number is too short")
        .max(15, "Phone number is too long")
        .optional(),

    message: z
        .string()
        .trim()
        .max(500, "Message cannot exceed 500 characters")
        .optional(),

    eventId: z.string().trim(),
    userId: z.string().trim()
});

export type EventRegistrationInput = z.infer<
    typeof eventRegistrationSchema
>;
