/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import { envVariables } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedAdmin";
import { connectRedis } from "./app/config/redis.config";

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(envVariables.DATABASE_URL);
    console.log(`✅ Connected to MongoDB`);

    server = app.listen(envVariables.PORT, () => {
      console.log(`✅ Server is running on port ${envVariables.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

(async () => {
  await connectRedis();
  await startServer();
  await seedSuperAdmin();
})();

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
