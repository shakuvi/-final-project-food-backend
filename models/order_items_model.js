const { Schema, model } = require("mongoose");
const Order = require("./order_model");
const Food = require("./food_model");

const orderItemsSchema = new Schema(
  {
    orderID: { type: Schema.Types.ObjectId, ref: "Order" },
    food: { type: Schema.Types.ObjectId, ref: "Food" },
    price: { type: Number },
    quantity: { type: Number },
  },
  { collection: "orderItemWithQuantities" }
);

module.exports = model("OrderItemWithQuantity", orderItemsSchema);
