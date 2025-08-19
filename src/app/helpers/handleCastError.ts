/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error.types";

// ---------------------- Handle CastError ---------------------- //
// Mongoose throws CastError when an invalid ObjectId is used in a query.
// Example: `/users/123` instead of a valid 24-char MongoDB ObjectId.
// This function formats the error into a consistent structure
// that aligns with our global error handler response type.

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400, // Bad Request
    message: "Invalid MongoDB ObjectID. Please provide a valid id",
  };
};
