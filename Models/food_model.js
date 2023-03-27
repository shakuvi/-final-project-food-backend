import { Schema, model } from "mongoose";
const FoodCatergory = require("./food_category_model");

const foodSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "FoodCatergory" }, //Get object id from foodCategory_model
  },
  { collection: "foods" }
);

module.exports = model("Food", foodSchema);
