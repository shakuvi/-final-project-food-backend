import { Schema, model } from "mongoose";

const orderTypeSchema = new Schema(
  {
    ordertype: { type: String },
  },
  { collection: "orderTypes" }
);

module.exports = model("OrderType", orderTypeSchema);
