/* eslint-disable no-console */
import { createClient } from "redis";
import { envVariables } from "./env";

// ---------------------- Redis Client ---------------------- //
// Create a Redis client using credentials and socket configuration from env variables.
// This will be used throughout the app for caching, sessions, and rate limiting.
export const redisClient = createClient({
  username: envVariables.REDIS_USERNAME,
  password: envVariables.REDIS_PASSWORD,
  socket: {
    host: envVariables.REDIS_HOST,
    port: Number(envVariables.REDIS_PORT),
  },
});

// Listen for Redis connection errors to avoid silent failures.
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// ---------------------- Redis Connection Function ---------------------- //
// Ensures Redis is connected before use. Call this during server startup.
export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  }
};
