const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    dateOfBirth: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
  },
  { collection: "employees" }
);

module.exports = model("Employee", employeeSchema);
