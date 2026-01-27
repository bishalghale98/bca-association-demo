import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import prisma from "@/lib/db";
import path from "path";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { NextRequest } from "next/server";

class ProfileController {
  async updateProfile(req: NextRequest) {
    try {
      // 🔐 Auth check
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      const formData = await req.formData();

      const avatar = formData.get("avatarUrl") as File | null;
      const dataStr = formData.get("data")?.toString() || "{}";
      const otherData = JSON.parse(dataStr);

      let avatarUrl: string | undefined;

      // ===============================
      // 📤 Upload avatar if exists
      // ===============================
      if (avatar) {
        const bytes = await avatar.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = session.user.name
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "-"); // space → dash

        const publicId = `${fileName}-${Date.now()}`;

        const uploadResult = await uploadToCloudinary(
          buffer,
          avatar.type,
          "association/user",
          publicId,
        );

        avatarUrl = uploadResult.secure_url;
      }

      // ===============================
      // 🧠 Update user in database
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

          ...(avatarUrl && { avatarUrl }),
        },
      });

      const { password, ...userWithoutPassword } = updatedUser;

      return Response.json({
        success: true,
        message: "Profile updated successfully",
        data: userWithoutPassword,
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
