import { prisma } from "@/lib/db";
import { RegisterUserSchema } from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

class AuthController {
  async userRegister(req: NextRequest) {
    try {
      const body = await req.json();

      const parsed = RegisterUserSchema.safeParse(body);

      if (!parsed.success) {
        return Response.json(
          {
            success: false,
            message: "Invalid registration data",
            errors: parsed.error.issues,
          },
          { status: 400 }
        );
      }

      const { email, studentId, password, semester, year, ...rest } =
        parsed.data;

      // 🔍 Check existing user
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { studentId }],
        },
      });

      if (existingUser) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 409 }
        );
      }

      // 🔐 Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Create user
      await prisma.user.create({
        data: {
          email,
          studentId,
          password: hashedPassword,

          semester,
          year,

          role: "MEMBER",
          membershipStatus: "PENDING",
          joinDate: new Date(),

          ...rest,
        },
      });

      return Response.json(
        {
          success: true,
          message: "Registration successful. Await admin approval.",
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Register error:", error);
      return Response.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

const authController = new AuthController();
export default authController;
