const { Schema, model } = require("mongoose");
const User = require("../models/user_model");

const feedbackSchema = new Schema(
  {
    feedbackdetils: { type: String },
    rateValue: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    sentiment: { type: String },
  },
  { collection: "feedbacks" }
);

module.exports = model("Feedback", feedbackSchema);
