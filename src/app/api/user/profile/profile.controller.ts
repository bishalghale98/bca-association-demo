import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { prisma } from "@/lib/db";

class ProfileController {
  async updateProfile(req: Request) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      const body = await req.json();

      const {
        phone,
        bio,
        course,
        specialization,
        semester,
        dateOfBirth,
        gender,
        address,
        bloodGroup,
        emergencyContact,
      } = body;

      const updatedUser = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          phone,
          bio,
          course,
          specialization,
          semester,
          dateOfBirth: dateOfBirth,
          gender,
          address,
          bloodGroup,
          emergencyContact,
        },
      });

      return Response.json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return Response.json(
        { success: false, message: "Internal server error" },
        { status: 500 },
      );
    }
  }
}

const profileController = new ProfileController();
export default profileController;
