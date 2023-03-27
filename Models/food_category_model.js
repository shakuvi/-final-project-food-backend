const { Schema, model } = require("mongoose");

const foodCategorySchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    description: { type: String },
  },
  { collection: "foodCatergories" }
);

module.exports = model("FoodCatergory", foodCategorySchema);
