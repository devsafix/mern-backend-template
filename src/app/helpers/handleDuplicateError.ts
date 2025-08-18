import { TGenericErrorResponse } from "../interfaces/error.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^"]*)"/);

  if (matchedArray && matchedArray.length > 1) {
    return {
      statusCode: 400,
      message: `${matchedArray[1]} already exists!!`,
    };
  }

  const fieldNameMatch = err.message.match(/index: ([a-zA-Z]+)_1/);
  if (fieldNameMatch && fieldNameMatch.length > 1) {
    return {
      statusCode: 400,
      message: `The provided ${fieldNameMatch[1]} already exists!!`,
    };
  }

  return {
    statusCode: 400,
    message: `Duplicate entry error.`,
  };
};
