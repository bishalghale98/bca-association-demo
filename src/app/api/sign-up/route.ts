import authController from "./signup.controller";

export const POST = async (req: Request, res: Response) => {
  return authController.userRegister(req, res);
};
