import express from "express";
import { AuthControllers } from "./auth.controller";
import { createUserZodSchema } from "../user/user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthControllers.register
);
router.post("/login", AuthControllers.login);
router.post("/forgot-password", AuthControllers.forgotPassword);
router.post("/reset-password", checkAuth, AuthControllers.resetPassword);
router.post("/refresh-token", AuthControllers.getNewAccessToken);

export const AuthRoutes = router;
