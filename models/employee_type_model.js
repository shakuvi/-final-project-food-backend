const { Schema, model } = require("mongoose");

const employeeTypeSchema = new Schema(
  {
    employeeType: { type: String },
  },
  { collection: "employeeTypes" }
);

module.exports = model("employeeType", employeeTypeSchema);
