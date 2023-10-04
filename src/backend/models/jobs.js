const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide a company name"],
    },
    position: {
      type: String,
      trim: true,
      required: [true, "Please provide a position"],
    },
    status: {
      type: String,
      enum: ["interviewed", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", CompanySchema);
