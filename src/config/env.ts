import { z } from "zod";
import dotenv from "dotenv";

// Load the .env file
dotenv.config();

// Define the schema for the .env file
const envSchema = z.object({
  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val)),
  MONGO_URI: z.string().trim(),
});

// Validate the .env file
const env = envSchema.safeParse({
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
});

if (!env.success) {
  throw new Error(env.error.errors[0].message);
}

export const envVariables = env.data;
