// ---------------------- Custom Application Error ---------------------- //
// Extends the built-in Error class to include HTTP status codes.
// This allows throwing consistent errors across the app (e.g., 400, 404, 500).
// Used in services, controllers, and middleware for better error handling.

class AppError extends Error {
  public statusCode: number; // HTTP status code (e.g., 400, 404, 500)

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    // Preserve stack trace for debugging
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
