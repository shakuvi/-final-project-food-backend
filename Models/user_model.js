const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    dateOfBirth: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
  },
  { collection: "users" }
);

module.exports = model("User", userSchema);
