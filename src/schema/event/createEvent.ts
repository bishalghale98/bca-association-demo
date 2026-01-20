import z from "zod";

// Event form schema
export const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters." })
      .max(100, { message: "Title must not exceed 100 characters." }),

    description: z
      .string()
      .max(500, { message: "Description must not exceed 500 characters." })
      .optional(),

    location: z
      .string()
      .max(200, { message: "Location must not exceed 200 characters." })
      .optional(),

    // Single-day event date (optional if using start/end)
    eventDate: z.date().optional(),

    // Multi-day event
    startDate: z.date().optional(),

    endDate: z.date().optional(),
  })
  .refine(
    (data) => {
      // If multi-day event, both startDate and endDate must exist
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
        "Both startDate and endDate must be provided for a multi-day event.",
      path: ["startDate", "endDate"],
    },
  )
  .refine(
    (data) => {
      // If multi-day event, endDate must be after startDate
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "endDate must be after startDate.",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      // Event date must be in the future if single-day
      if (data.eventDate) {
        return data.eventDate > new Date();
      }
      return true;
    },
    {
      message: "Event date must be in the future.",
      path: ["eventDate"],
    },
  );

// Type for form values
export type EventFormValues = z.infer<typeof eventFormSchema>;

// API schema for creating/updating events
export const eventApiSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters.")
      .max(100, "Title must not exceed 100 characters."),

    description: z
      .string()
      .max(500, "Description must not exceed 500 characters.")
      .optional(),

    location: z
      .string()
      .max(200, "Location must not exceed 200 characters.")
      .optional(),

    // Single-day event (optional if using start/end)
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
      // If multi-day event, both startDate and endDate must exist
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
      // Event date must be in the future if single-day
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

// Type for API input
export type EventApiInput = z.infer<typeof eventApiSchema>;
