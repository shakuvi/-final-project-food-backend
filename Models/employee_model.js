import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String },
  dateOfBirth: { type: String },
  mobileNumber: { type: String },
  password: { type: String },
});

export default model("employees", employeeSchema);
