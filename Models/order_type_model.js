const { Schema, model } = require("mongoose");

const orderTypeSchema = new Schema(
  {
    orderType: { type: String },
  },
  { collection: "orderTypes" }
);

module.exports = model("OrderType", orderTypeSchema);
