import express from "express";
import { UserControllers } from "./user.controller";
import { userRoles } from "./user.constant";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateUserZodSchema } from "./user.validation";

const router = express.Router();

router.get(
  "/all-users",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.getUsers
);

// Get single login user
router.get("/me", checkAuth, UserControllers.getMe);

// Get single user
router.get(
  "/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.getSingleUser
);

// Update user
router.patch(
  "/:id",
  checkAuth,
  validateRequest(updateUserZodSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
