const express = require("express");
const foodRoute = express.Router();
const Food = require("../models/food_model");

//Order Items with quantity
foodRoute.route("/create").post((req, res) => {
  const { name, price, description, image, category } = req.body;
  const food = new Food({
    name,
    price,
    description,
    image,
    category,
  });
  food
    .save()
    .then((food) => {
      res.status(200).send({ status: "sucess", food });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = foodRoute;
