const { default: axios } = require("axios");
const express = require("express");
const recommendationRoute = express.Router();
const Food = require("../models/food_model");
const FoodCatergory = require("../models/food_category_model");

/**
 * @swagger
 * tags:
 *   name: Recommendation
 *   description: API endpoints for retrieving food recommendations
 */

/**
 * @swagger
 * /recommendation/get-all:
 *   post:
 *     summary: Get food recommendations for a user
 *     tags: [Recommendation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecommendationRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecommendationResponse'
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
 *     RecommendationRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *     RecommendationResponse:
 *       type: object
 *       properties:
 *         foods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Food'
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FoodCategory'
 *     Food:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         category:
 *           $ref: '#/components/schemas/FoodCategory'
 *     FoodCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         errorMsg:
 *           type: string
 */

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
