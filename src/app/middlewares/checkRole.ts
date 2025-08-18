import { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const checkRole =
  (...allowedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

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
