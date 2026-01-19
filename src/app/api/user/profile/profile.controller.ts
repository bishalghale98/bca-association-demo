import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { prisma } from "@/lib/db";

class ProfileController {
  async updateProfile(req: Request) {
    try {
      // 🔐 Auth check
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      let avatar: File | null = null;
      let otherData: any = {};

      const formData = await req.formData();

      avatar = formData.get("avatarUrl") as File | null;
      console.log("Avatar file received:", avatar);

      // Other fields sent as JSON string in 'data'
      const dataStr = formData.get("data")?.toString() || "{}";
      otherData = JSON.parse(dataStr);

      const image = otherData.avatarUrl;

      //  cloudinary login

      // ===============================
      // 🔹 Update user in database
      // ===============================
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          phone: otherData.phone,
          bio: otherData.bio,
          course: otherData.course,
          specialization: otherData.specialization,
          semester: otherData.semester,
          dateOfBirth: otherData.dateOfBirth
            ? new Date(otherData.dateOfBirth)
            : null,
          gender: otherData.gender,
          address: otherData.address,
          bloodGroup: otherData.bloodGroup,
          emergencyContact: otherData.emergencyContact,
          // For now, just console avatar; later replace with upload logic
          // avatarUrl: avatar ? 'upload logic here' : undefined
        },
      });

      return Response.json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
        avatarReceived: !!avatar, // optional info for frontend
      });
    } catch (error) {
      console.error("Profile update error:", error);
      return Response.json(
        { success: false, message: "Internal server error" },
        { status: 500 },
      );
    }
  }
}

const profileController = new ProfileController();
export default profileController;
