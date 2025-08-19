import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { OtpRoutes } from "../modules/otp/otp.route";

// Initialize Express Router
export const router = Router();

// All module-based routes are collected here
const moduleRoutes = [
  {
    path: "/auth", // base route for authentication (login, signup, refresh, etc.)
    route: AuthRoutes,
  },
  {
    path: "/users", // base route for user management
    route: UserRoutes,
  },
  {
    path: "/otp", // base route for OTP related APIs
    route: OtpRoutes,
  },
];

// Dynamically register all routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
