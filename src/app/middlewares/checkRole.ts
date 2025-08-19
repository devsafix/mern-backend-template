import { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";

// ---------------------- Role-Based Authorization Middleware ---------------------- //
// This middleware ensures that the logged-in user has one of the allowed roles.
// Usage: checkRole('admin', 'moderator') → only users with these roles can access route.
export const checkRole =
  (...allowedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role; // Comes from checkAuth middleware

      if (!userRole || !allowedRoles.includes(userRole)) {
        return next(
          new AppError(httpStatus.FORBIDDEN, "Forbidden: Access denied")
        );
      }

      next();
    } catch (error) {
      next(
        new AppError(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Internal server error ${error}`
        )
      );
    }
  };
