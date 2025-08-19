import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------------- Handle Mongoose Validation Error ---------------------- //
// Triggered when schema validation fails (e.g., required field missing, invalid value).
// Collects all field-specific errors and formats them into a standardized response.

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  const errors = Object.values(err.errors);

  // Extract field path + error message from each validation error
  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
