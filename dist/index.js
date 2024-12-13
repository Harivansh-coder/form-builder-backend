"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const forms_1 = __importDefault(require("./routes/forms"));
const questions_1 = __importDefault(require("./routes/questions"));
const response_1 = __importDefault(require("./routes/response"));
// create a new express application instance
const app = (0, express_1.default)();
// middleware for parsing application/json
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// define a route handler for the default home page
app.get("/v1", (_req, res) => {
    res.send("API is running");
});
// connect to MongoDB
mongoose_1.default
    .connect(env_1.envVariables.MONGO_URI || "", {})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
    process.exit(1);
});
// Load all routes
app.use("/v1/forms", forms_1.default);
app.use("/v1/questions", questions_1.default);
app.use("/v1/responses", response_1.default);
// error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// Export the app for Vercel
exports.default = app;
// Start server locally when not in a serverless environment
if (process.env.NODE_ENV !== "production") {
    const port = env_1.envVariables.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}
