import cloudinary from "@/lib/cloudinary";

export const uploadToCloudinary = async (
  buffer: Buffer,
  mimetype: string,
  folder: string,
  publicId: string,
) => {
  const base64 = buffer.toString("base64");
  const dataUri = `data:${mimetype};base64,${base64}`;

  return cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: publicId,
    allowed_formats: ["jpg", "png", "jpeg"],
  });
};
