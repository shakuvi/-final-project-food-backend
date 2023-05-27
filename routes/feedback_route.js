const express = require("express");
const feedbackRoute = express.Router();
const Feedback = require("../models/feedback_model");

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API endpoints for managing feedback
 */

/**
 * @swagger
 * /feedback/create:
 *   post:
 *     summary: Add feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreateRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /feedback/get-all:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackListResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedbackCreateRequest:
 *       type: object
 *       properties:
 *         review:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *             reviewText:
 *               type: string
 *             userId:
 *               type: string
 *             orderId:
 *               type: string
 *       required:
 *         - review
 *     FeedbackResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         feedback:
 *           $ref: '#/components/schemas/Feedback'
 *     FeedbackListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         feedback:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Feedback'
 *     Feedback:
 *       type: object
 *       properties:
 *         feedbackdetils:
 *           type: string
 *         rateValue:
 *           type: number
 *         userId:
 *           $ref: '#/components/schemas/User'
 *         orderId:
 *           $ref: '#/components/schemas/Order'
 *     User:
 *       type: object
 *       properties:
 *         // Specify the properties of the user object here
 *     Order:
 *       type: object
 *       properties:
 *         // Specify the properties of the order object here
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

// ...existing code...

module.exports = feedbackRoute;

//Add feedback
feedbackRoute.route("/create").post((req, res) => {
  const { review } = req.body;
  const {
    rating: rateValue,
    reviewText: feedbackdetils,
    userId,
    orderId,
  } = review;

  axios
    .get(
      `https://food-fast-api-rec.herokuapp.com/sentiment-analysis/${feedbackdetils}`
    )
    .then((response) => {
      const feedback = new Feedback({
        feedbackdetils,
        rateValue,
        userId,
        orderId,
        sentiment: response.data.sentiment,
      });
      feedback
        .save()
        .then((feedback) => {
          res.status(200).send({ status: "sucess", feedback });
        })
        .catch((e) => {
          res.status(400).send({ status: "faliure" });
        });
    })
    .catch((e) => {
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
