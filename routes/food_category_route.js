const express = require("express");
const foodcatergoryRoute = express.Router();
const FoodCatergory = require("../models/food_category_model");

//Add catergory
foodcatergoryRoute.route("/create").post((req, res) => {
  const { name, image, description } = req.body;
  const foofcatergory = new FoodCatergory({
    name,
    image,
    description,
  });
  foofcatergory
    .save()
    .then((foofcatergory) => {
      res.status(200).send({ status: "sucess", foofcatergory });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View all catergory
foodcatergoryRoute.route("/get-all").get((req, res) => {
  FoodCatergory.find()
    .then((foodcatergory) => {
      res.status(200).send({ status: "sucess", foodcatergory });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//update catergory
foodcatergoryRoute.route("/update").post((req, res) => {
  const { catergory } = req.body;
  console.log(catergory);
  FoodCatergory.findByIdAndUpdate(catergory._id, catergory)
    .then((foodcatergory) => {
      res.status(200).send({ status: "sucess", foodcatergory });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = foodcatergoryRoute;
