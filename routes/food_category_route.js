const express = require("express");
const foodcatergoryRoute = express.Router();
const FoodCatergory = require("../models/food_category_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

//Add catergory
foodcatergoryRoute.route("/create").post(verifyToken, (req, res) => {
  const { catergory } = req.body;
  console.log(catergory);
  console.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner") {
    const newCatergory = new FoodCatergory({ ...catergory });
    newCatergory
      .save()
      .then((foodcatergory) => {
        res.status(200).send({ status: "sucess", foodcatergory });
      })
      .catch((e) => {
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
});

//View all catergory
foodcatergoryRoute.route("/get-all").get((req, res) => {
  console.log(req.user);

  FoodCatergory.find()
    .then((foodcatergory) => {
      res.status(200).send({ status: "sucess", foodcatergory });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//update catergory
foodcatergoryRoute.route("/update").post(verifyToken, (req, res) => {
  const { catergory } = req.body;
  onsole.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner") {
    console.log(catergory);
    FoodCatergory.findByIdAndUpdate(catergory._id, catergory)
      .then((foodcatergory) => {
        res.status(200).send({ status: "sucess", foodcatergory });
      })
      .catch((e) => {
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
});

module.exports = foodcatergoryRoute;
