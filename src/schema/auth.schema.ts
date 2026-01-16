import { Gender, MembershipStatus, UserRole } from "@/generated/prisma/enums";
import { z } from "zod";

export const UserSchema = z.object({
  // 🔑 Core Identity
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  role: z.nativeEnum(UserRole).default(UserRole.MEMBER),
  password: z.string(),

  // 🎓 Academic Information
  studentId: z.string().min(1, "Student ID is required"),
  course: z.string().optional(),
  specialization: z.string().optional(),
  semester: z.number().int().default(1),
  year: z.number().int().optional(),

  // 👤 Personal Profile
  dateOfBirth: z.date().optional(),
  gender: z.nativeEnum(Gender).optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  bloodGroup: z.string().optional(),
  emergencyContact: z.string().optional(),

  // 🏷 Membership & System Info
  joinDate: z.date().optional(),
  membershipStatus: z
    .nativeEnum(MembershipStatus)
    .default(MembershipStatus.PENDING),

  // 🏆 Gamification / Engagement
  points: z.number().int().nonnegative().default(0),
  level: z.number().int().nonnegative().default(1),
  nextLevelPoints: z.number().int().nonnegative().default(100),
});

// TypeScript type for usage
export type UserInput = z.infer<typeof UserSchema>;
