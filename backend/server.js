// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns"); // ✅ ADD THIS
require("dotenv").config();

// ✅ Fix SRV DNS issues (Atlas fix)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/applications", require("./routes/application"));
app.use("/api/ai", require("./routes/ai"));

// 🔍 Debug check (remove later)
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo Error:", err));

app.listen(5000, () => console.log("Server running on port 5000 🚀"));