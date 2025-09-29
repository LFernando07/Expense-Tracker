import express from "express";
import { configDotenv } from "dotenv";

import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import cookieParser from "cookie-parser";

import { expenseRoute } from "./routes/expense.route.js";
import { userRoute } from "./routes/user.route.js";
import { authRoute } from "./routes/auth.route.js";

// Load environmets variables
configDotenv();

// build express app
const app = express();

// Get listen port
const PORT = process.env.PORT || 3000;

// Add middlewares to api
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());

// Route root API
app.get("/", (req, res) => {
  res.json("This is my Expense API");
});

// Add rotues to api
app.use("/api/users", userRoute());
app.use("/api/expenses", expenseRoute());
app.use("/api/auth", authRoute());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
