import { JwtPayload } from "jsonwebtoken";

// ---------------------- Express Request Augmentation ---------------------- //
// This file extends the default Express Request interface
// to include a `user` property containing the decoded JWT payload.
// It allows TypeScript to recognize `req.user` in routes/middleware
// without throwing type errors.

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload; // Holds user data from the verified JWT
    }
  }
}
