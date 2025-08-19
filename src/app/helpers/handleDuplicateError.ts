import { TGenericErrorResponse } from "../interfaces/error.types";

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------------- Handle Duplicate Key Error ---------------------- //
// This handles MongoDB duplicate key errors (code: 11000).
// Example: trying to register a user with an email that already exists.
// Extracts the duplicate field value from the error message if possible.

export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  // Try to extract the duplicate value from error message using regex
  const matchedArray = err.message.match(/"([^"]*)"/);

  if (matchedArray && matchedArray.length > 1) {
    return {
      statusCode: 400,
      message: `${matchedArray[1]} already exists!!`,
    };
  }

  // Fallback: extract the field name (e.g., email, username) from error message
  const fieldNameMatch = err.message.match(/index: ([a-zA-Z]+)_1/);
  if (fieldNameMatch && fieldNameMatch.length > 1) {
    return {
      statusCode: 400,
      message: `The provided ${fieldNameMatch[1]} already exists!!`,
    };
  }

  // Default message if no specific field/value is found
  return {
    statusCode: 400,
    message: `Duplicate entry error.`,
  };
};
