import { Schema, model } from "mongoose";

const foodCategorySchema = new Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
});

export default model("foodCategory", foodCategorySchema);
