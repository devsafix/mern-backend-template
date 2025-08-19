import { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { envVariables } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";

// ---------------------- Authentication Middleware ---------------------- //
// Verifies JWT access token before allowing access to protected routes.
// 1. Extract token from headers/cookies.
// 2. Validate and decode token.
// 3. Check if user exists in DB.
// 4. Attach decoded payload to `req.user` for downstream use.
// If any step fails → throws an AppError (401 Unauthorized).

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from Authorization header or cookies
    const token = req.headers.authorization || req.headers.cookie;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized: No token");
    }

    // Verify token and decode payload
    const decoded = verifyToken(
      token,
      envVariables.JWT_ACCESS_SECRET
    ) as JwtPayload;

    // Ensure user still exists in DB (handles deleted/blocked users)
    const isUserExist = await User.findById(decoded.userId);

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    // Attach decoded token payload to request for access in controllers
    req.user = decoded;
    next();
  } catch (error) {
    // Any failure = unauthorized
    next(
      new AppError(
        httpStatus.UNAUTHORIZED,
        `Unauthorized: Invalid token ${error}`
      )
    );
  }
};
