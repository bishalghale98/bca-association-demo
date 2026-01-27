import profileController from "./profile.controller";

export async function PUT(req: Request, res: Response) {
  return profileController.updateProfile(req);
}
