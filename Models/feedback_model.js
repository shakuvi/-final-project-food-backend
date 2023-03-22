import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  feedback: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "users" }, //Get object id from user_model
  /*Need to add order ID*/
});

export default model("feedbacks", feedbackSchema);
