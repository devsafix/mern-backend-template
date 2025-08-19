/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

// ---------------------- Handle Zod Validation Error ---------------------- //
// Handles validation errors thrown by Zod schemas (used in request validations).
// Collects all field-specific issues and formats them into a standardized response.

export const handleZodError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  // Loop through Zod issues array to extract field + message
  err.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1], // Last item = field name
      message: issue.message,
    });
  });

  return {
    statusCode: 400,
    message: "Zod Error",
    errorSources,
  };
};
