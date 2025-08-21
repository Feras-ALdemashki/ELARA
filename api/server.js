// server.js
import express from "express";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expensesRoutes from "./routes/expensesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load environment variables from .env
configDotenv();

const app = express();
connectDB();
// Middleware
const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["content-type", "authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
// connect to routes
app.use("/api/auth", authRouter);
app.use("/api/income", incomeRoutes);
app.use("api/expenses", expensesRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
