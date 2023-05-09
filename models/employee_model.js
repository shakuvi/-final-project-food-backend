const { Schema, model } = require("mongoose");
const employeeType = require("./employee_type_model");

const employeeSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    dateOfBirth: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
    employeeType: { type: Schema.Types.ObjectId, ref: "employeeType" },
  },
  { collection: "employees" }
);

module.exports = model("Employee", employeeSchema);
