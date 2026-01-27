import authController from "./signup.controller";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return authController.userRegister(req);
};
