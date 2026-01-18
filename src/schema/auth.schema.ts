import { z } from "zod";
import { Gender, MembershipStatus, UserRole } from "@/types/user/enums";

export const RegisterUserSchema = z.object({
  // 🔑 Core
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),

  // 🎓 Academic
  studentId: z.string().min(1),
  semester: z.string(),
  year: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),

  // Optional profile
  phone: z.string().optional(),
  course: z.string().optional(),
  specialization: z.string().optional(),

  dateOfBirth: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),

  gender: z.nativeEnum(Gender).optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  bloodGroup: z.string().optional(),
  emergencyContact: z.string().optional(),

  termsAccepted: z.boolean(),
  physicallyVerified: z.boolean(),
  associationRules: z.boolean(),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

//  Create a clean registration schema with proper types
export const RegisterFormSchema = z
  .object({
    // Required fields
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    studentId: z.string().min(1, "Student ID is required"),
    semester: z.string().min(1, "Semester is required"), // ✅ Changed to string

    // Optional fields
    phone: z.string().optional(),
    course: z.string().optional(),
    specialization: z.string().optional(),
    year: z.string().optional(), // ✅ Changed to string
    dateOfBirth: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    bloodGroup: z.string().optional(),
    emergencyContact: z.string().optional(),

    // Verification checkboxes
    termsAccepted: z.boolean(),
    physicallyVerified: z.boolean(),
    associationRules: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.termsAccepted === true, {
    message: "You must accept terms and conditions",
    path: ["termsAccepted"],
  })
  .refine((data) => data.physicallyVerified === true, {
    message: "You must confirm physical verification",
    path: ["physicallyVerified"],
  })
  .refine((data) => data.associationRules === true, {
    message: "You must agree to association rules",
    path: ["associationRules"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
