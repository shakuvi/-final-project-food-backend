import { Schema, model } from "mongoose";

const foodCategorySchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    description: { type: String },
  },
  { collection: "foodCatergories" }
);

module.exports = model("FoodCatergory", foodCategorySchema);
