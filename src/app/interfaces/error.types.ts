// ---------------------- Error Response Types ---------------------- //
// These interfaces define the structure of error responses used across the app.
// Ensures consistent error formatting for both handled and unhandled exceptions.

export interface TErrorSources {
  path: string; // The field/key where the error occurred (e.g., "email", "password")
  message: string; // Human-readable error message for the client
}

export interface TGenericErrorResponse {
  statusCode: number; // HTTP status code (e.g., 400, 404, 500)
  message: string; // General error message
  errorSources?: TErrorSources[]; // Optional list of field-specific errors (e.g., validation errors)
}
