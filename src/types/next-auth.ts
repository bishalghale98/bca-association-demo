import { Gender, MembershipStatus, UserRole } from "@/generated/prisma/enums";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // 🔑 Core Identity
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    avatarUrl?: string | null;
    role: UserRole;

    // 🎓 Academic Information
    studentId: string;
    course?: string | null;
    specialization?: string | null;
    semester: number;
    year?: number | null;

    // 👤 Personal Profile
    dateOfBirth?: Date | null;
    gender?: Gender | null;
    address?: string | null;
    bio?: string | null;
    bloodGroup?: string | null;
    emergencyContact?: string | null;

    // 🏷 Membership & System Info
    joinDate?: Date | null;
    membershipStatus: MembershipStatus;

    // 🏆 Gamification / Engagement
    points: number;
    level: number;
    nextLevelPoints: number;

    // ⏱ System Timestamps
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // 🔑 Core Identity
    id: string;
    role: UserRole;

    // 🎓 Academic Information
    studentId: string;
    semester: number;

    // 🏷 Membership
    membershipStatus: MembershipStatus;

    // 🏆 Gamification
    points: number;
    level: number;
  }
}
