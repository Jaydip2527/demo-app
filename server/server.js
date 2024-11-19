require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { errorHandler } = require("./src/middleware");
const userRoutes = require("./src/routes/user");
const bookRoutes = require("./src/routes/book");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));

// Database connection
mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((e) => {
    console.log("Failed to connect DB", e);
  });

// Import Routers
app.use("/user", userRoutes);
app.use("/items", bookRoutes);

// For testing only
// app.use("/", (req, res) => {
//   res.send("Server is running...");
// });

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Remove app.listen() for Vercel serverless deployment
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Corrected export statement for Vercel
module.exports = app;
