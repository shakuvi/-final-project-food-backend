import { Schema, model } from "mongoose";

const orderTypeSchema = new Schema({
  ordertype: { type: String },
});

export default model("ordertype", orderTypeSchema);
