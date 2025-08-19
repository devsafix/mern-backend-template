import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVariables } from "./app/config/env";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// ---------------------- Global Middlewares ---------------------- //

// Enable CORS for the frontend URL defined in env variables.
// `credentials: true` allows cookies and auth headers to be sent cross-origin.
app.use(cors({ origin: envVariables.FRONTEND_URL, credentials: true }));

// Parse incoming requests with JSON payloads.
app.use(express.json());

// Parse incoming requests with URL-encoded payloads (form submissions).
app.use(express.urlencoded({ extended: true }));

// Parse cookies attached to client requests.
app.use(cookieParser());

// ---------------------- Application Routes ---------------------- //

// Prefix all routes with `/api/v1` for versioning.
app.use("/api/v1/", router);

// Health-check endpoint — useful for monitoring and testing if server is running.
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "OK", message: "Your Backend API is working" });
});

// ---------------------- Error Handling ---------------------- //

// Global error handler (catches all thrown errors and formats response).
app.use(globalErrorHandler);

// 404 handler for undefined routes.
app.use(notFound);

export default app;
