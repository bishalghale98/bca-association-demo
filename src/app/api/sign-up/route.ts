import authController from "./signup.controller";

export const POST = async (req: Request) => {
  return authController.userRegister(req);
};
