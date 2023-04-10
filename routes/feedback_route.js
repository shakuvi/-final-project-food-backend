const express = require("express");
const feedbackRoute = express.Router();
const Feedback = require("../models/feedback_model");

//Add feedback
feedbackRoute.route("/create").post((req, res) => {
  const { feedbackdetils, userID, orderId } = req.body;
  const feedback = new Feedback({
    feedbackdetils,
    userID,
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
    .then((feedback) => {
      res.status(200).send({ status: "sucess", feedback });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = feedbackRoute;
