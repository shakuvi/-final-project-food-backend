const { Schema, model } = require("mongoose");
// const User = require("./user_model");

const feedbackSchema = new Schema(
  {
    feedback: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: "User" }, //Get object id from user_model
    /*Need to add order ID*/
  },
  { collection: "feedbacks" }
);

module.exports = model("Feedback", feedbackSchema);
