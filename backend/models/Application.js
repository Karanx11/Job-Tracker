// models/Application.js
const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
  {
    userId: String,

    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },

    required_skills: [String],
    nice_to_have_skills: [String],

    seniority: String,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", appSchema);