import express from "express";
import mongoose from "mongoose";
import { envVariables } from "@/config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import formRouter from "@/routes/forms";
import questionRouter from "./routes/questions";
import responseRouter from "./routes/response";

// create a new express application instance
const app = express();

// middleware for parsing application/json
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/v1", (_req: express.Request, res: express.Response) => {
  res.send("API is running");
});

// connect to MongoDB
mongoose
  .connect(envVariables.MONGO_URI || "", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
    process.exit(1);
  });

// Load all routes
app.use("/v1/forms", formRouter);
app.use("/v1/questions", questionRouter);
app.use("/v1/responses", responseRouter);

// error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

// Export the app for Vercel
export default app;

// Start server locally when not in a serverless environment
if (process.env.NODE_ENV !== "production") {
  const port = envVariables.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
