import prisma from "@/lib/db";
import { UserSchema } from "@/schema/auth.schema";
import bcrypt from "bcryptjs";

class AuthController {
  async userRegister(req: Request, res: Response) {
    try {
      const body = await req.json();

      const parsed = UserSchema.safeParse(body);

      if (!parsed.success) {
        return Response.json(
          {
            success: false,
            message: "Invalid registration data",
            errors: parsed.error.issues,
          },
          {
            status: 400,
          }
        );
      }

      const { email, studentId, password, ...rest } = parsed.data;

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
            message: "User already registered with this email or student ID",
          },
          {
            status: 409,
          }
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
          joinDate: new Date(),
          ...rest,
        },
      });

      return Response.json(
        {
          success: true,
          message: "Registration successful. Please wait for admin approval.",
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error("Register error:", error);

      return Response.json(
        {
          success: false,
          message: "Internal server error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
const authController = new AuthController();
export default authController;
