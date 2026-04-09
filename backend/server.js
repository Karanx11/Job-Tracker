// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Fix DNS (useful for MongoDB Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();

// Middleware
app.use(cors({
  origin: "*", // allow all (safe for now, restrict later if needed)
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/applications", require("./routes/application"));
app.use("/api/ai", require("./routes/ai"));

//  Debug (optional)
console.log("ENV loaded:", !!process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.log("Mongo Error:", err));

// Dynamic PORT (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);