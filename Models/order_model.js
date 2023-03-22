import { Schema, model } from "mongoose";

const orderSchema = new Schema({});

export default model("orders", orderSchema);
