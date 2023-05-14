const { default: axios } = require("axios");
const express = require("express");
const recommendationRoute = express.Router();
const Food = require("../models/food_model");
const FoodCatergory = require("../models/food_category_model");

recommendationRoute.route("/get-all").post((req, res) => {
  const { userId } = req.body;

  axios
    .get(
      `https://food-fast-api-rec.herokuapp.com/recommendation-load/${userId}&num_of_rec=5`
    )
    .then((response) => {
      const { recommendations } = response.data;

      const foodPromises = recommendations.map((id) => {
        return Food.findById(id).exec();
      });

      Promise.all(foodPromises)
        .then((results) => {
          const categoryIds = results.map((val) => val.category.toString());
          const uniqueSet = new Set(categoryIds);
          const uniqueArray = Array.from(uniqueSet);

          const categoryPromises = uniqueArray.map((id) => {
            return FoodCatergory.findById(id).exec();
          });

          Promise.all(categoryPromises)
            .then((categoryResult) => {
              res.send({ foods: results, categories: categoryResult });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure-ml" });
    });
});

module.exports = recommendationRoute;
