const express = require("express");
const feedbackRoute = express.Router();
const Feedback = require("../models/feedback_model");

//Add feedback
feedbackRoute.route("/create").post((req, res) => {
  const { review } = req.body;
  const {
    rating: rateValue,
    reviewText: feedbackdetils,
    userId,
    orderId,
  } = review;
  const feedback = new Feedback({
    feedbackdetils,
    rateValue,
    userId,
    orderId,
  });
  feedback
    .save()
    .then((feedback) => {
      res.status(200).send({ status: "sucess", feedback });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View all feedbacks
feedbackRoute.route("/get-all").get((req, res) => {
  Feedback.find()
    .populate("userId")
    .populate("orderId")
    .then((feedback) => {
      res.status(200).send({ status: "sucess", feedback });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = feedbackRoute;
