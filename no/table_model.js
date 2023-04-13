const { Schema, model } = require("mongoose");

const tableSchema = new Schema(
  {
    tableName: { type: String },
  },
  { collection: "tables" }
);

module.exports = model("Table", tableSchema);
