const express = require("express");
const path = require("path");
const cors = require("cors");
const { connectWithRetry, connection } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const diagnosisRoutes = require("./routes/diagnosisRoutes");
const errorHandler = require("./middleware/errorHandler");

// Express app setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectWithRetry();

// Check database connection status
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/diagnosis", diagnosisRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    mongodb: connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Global error handler
app.use(errorHandler);

// Start server with better error handling
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });
