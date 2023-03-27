const { Schema, model } = require("mongoose");

const orderTypeSchema = new Schema(
  {
    ordertype: { type: String },
  },
  { collection: "orderTypes" }
);

module.exports = model("OrderType", orderTypeSchema);
