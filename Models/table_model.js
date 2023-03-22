import { Schema, model } from "mongoose";

const tableSchema = new Schema({
  tableName: { type: String },
});

export default model("tables", tableSchema);
