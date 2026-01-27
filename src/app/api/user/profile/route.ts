import { NextRequest } from "next/server";
import profileController from "./profile.controller";

export async function PUT(req: NextRequest, res: Response) {
  return profileController.updateProfile(req);
}
