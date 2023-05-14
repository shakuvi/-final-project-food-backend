const express = require("express");
const feedbackRoute = express.Router();
const Feedback = require("../models/feedback_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

//Add feedback
feedbackRoute.route("/create").post((req, res) => {
  const { feedbackdetils, rateValue, userId, orderId, sentiment } = req.body;
  const feedback = new Feedback({
    feedbackdetils,
    rateValue,
    userId,
    orderId,
    sentiment,
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
feedbackRoute.route("/get-all").get(verifyToken, (req, res) => {
  console.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner" || employeeType === "kitchen") {
    Feedback.find()
      .populate("userId")
      .populate("orderId")
      .then((feedback) => {
        res.status(200).send({ status: "sucess", feedback });
      })
      .catch((e) => {
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
});

module.exports = feedbackRoute;
