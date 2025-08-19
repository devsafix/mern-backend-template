import { NextFunction, Request, Response } from "express";

/**
 * AsyncHandler type for wrapping controllers
 */
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Utility to wrap async functions and automatically forward errors to Express
 * @param fn - async function (controller/service handler)
 */
export const catchAsync =
  (fn: AsyncHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
