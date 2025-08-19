import { Request, Response } from "express";
import httpStatus from "http-status-codes";

// ---------------------- 404 Not Found Middleware ---------------------- //
// Handles undefined routes that do not match any route definitions.
const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};

export default notFound;
