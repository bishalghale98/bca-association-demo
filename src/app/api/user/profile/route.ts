import profileController from "./profile.controller";

export async function PATCH(req: Request, res: Response) {
  return profileController.updateProfile(req, res);
}
