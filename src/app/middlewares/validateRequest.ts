/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// ---------------------- Request Validation Middleware ---------------------- //
// Parses and validates incoming request bodies against a Zod schema.
// Automatically handles JSON parsing for nested "data" field (if present).
// On validation failure, returns structured 400 response with issues.

export const validateRequest = (schema: ZodSchema<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // If request contains a nested "data" field (e.g., multipart/form-data), parse it
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // Validate request body against the Zod schema
      req.body = await schema.parseAsync(req.body);

      next(); // Validation passed, proceed to next middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues,
        });
        return;
      }
      next(error); // Pass any other errors to global error handler
    }
  };
};
