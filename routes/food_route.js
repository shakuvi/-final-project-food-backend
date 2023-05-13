const express = require("express");
const foodRoute = express.Router();
const Food = require("../models/food_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

//Order Items with quantity
foodRoute.route("/create").post(verifyToken, (req, res) => {
  const { name, price, description, image, category } = req.body;
  console.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner") {
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
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
});

//View all foods
foodRoute.route("/get-all").get((req, res) => {
  Food.find()
    .then((foods) => {
      res.status(200).send({ status: "sucess", foods });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View all food accoding to catergory ID
foodRoute.route("/get-food-by-catergory-id").post((req, res) => {
  const { category } = req.body;
  Food.find({ category })
    .populate("category")
    .then((foods) => {
      // const foodIds = foods.map((food) => food._id); get food id's only
      res.status(200).send({
        status: "Success",
        foods,
      });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//update food
foodRoute.route("/update").post(verifyToken, (req, res) => {
  const { food } = req.body;
  console.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner") {
    console.log(food);
    Food.findByIdAndUpdate(food._id, food)
      .then((food) => {
        res.status(200).send({ status: "sucess", food });
      })
      .catch((e) => {
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
});

module.exports = foodRoute;
