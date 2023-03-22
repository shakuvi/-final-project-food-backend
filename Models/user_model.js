import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  password: { type: String },
});

export default model("users", userSchema);
