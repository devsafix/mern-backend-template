/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import { envVariables } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedAdmin";
import { connectRedis } from "./app/config/redis.config";

let server: Server;

// ---------------------- Server Initialization ---------------------- //
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(envVariables.DATABASE_URL);
    console.log(`✅ Connected to MongoDB`);

    // Start Express server
    server = app.listen(envVariables.PORT, () => {
      console.log(`✅ Server is running on port ${envVariables.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

// ---------------------- Bootstrap ---------------------- //
// IIFE (Immediately Invoked Function Expression) to run startup tasks.
(async () => {
  await connectRedis(); // Initialize Redis connection
  await startServer(); // Start MongoDB + Express server
  await seedSuperAdmin(); // Ensure default admin user exists
})();

// ---------------------- Process Handlers ---------------------- //
// Graceful shutdown for unexpected errors or system signals.
// These handlers prevent corrupted states and ensure resources are closed properly.

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected. Server Shutting Down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected. Server Shutting Down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
