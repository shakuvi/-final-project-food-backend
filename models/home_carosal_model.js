const { Schema, model } = require("mongoose");

const homeCarosalSchema = new Schema(
  {
    image: { type: String },
  },
  { collection: "homeCarosals" }
);

module.exports = model("HomeCarosal", homeCarosalSchema);
