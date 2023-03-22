import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: { type: String },
  price: { type: String },
  description: { type: String },
  image: { type: String },
});

export default model("foods", foodSchema);
