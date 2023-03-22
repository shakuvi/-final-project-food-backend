import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: { type: String },
  price: { type: String },
  description: { type: String },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "foodCategory" }, //Get object id from foodCategory_model
});

export default model("foods", foodSchema);
