const { Schema, model } = require("mongoose");
const User = require("./user_model");
const OrderType = require("./order_type_model");
const Table = require("./table_model");
const Employee = require("./employee_model");

const orderSchema = new Schema(
  {
    createDate: { type: String },
    createTime: { type: String },
    status: { type: String },
    orderedBy: { type: Schema.Types.ObjectId, ref: "User" },
    billValue: { type: String },
    discount: { type: String },
    orderType: { type: Schema.Types.ObjectId, ref: "OrderType" },
    table: { type: Schema.Types.ObjectId, ref: "Table" },
    handleBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { collection: "orders" }
);

module.exports = model("Order", orderSchema);
