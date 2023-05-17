const express = require("express");
const foodcatergoryRoute = express.Router();
const FoodCatergory = require("../models/food_category_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
/**
 * @swagger
 * tags:
 *   name: Food Category
 *   description: API endpoints for managing food categories
 */

/**
 * @swagger
 * /foodcategory/create:
 *   post:
 *     summary: Create a new food category
 *     tags: [Food Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategoryRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategoryResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /foodcategory/get-all:
 *   get:
 *     summary: Get all food categories
 *     tags: [Food Category]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategoryListResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /foodcategory/update:
 *   post:
 *     summary: Update a food category
 *     tags: [Food Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategoryRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategoryResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodCategoryRequest:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *     FoodCategoryResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         foodcategory:
 *           $ref: '#/components/schemas/FoodCategory'
 *     FoodCategoryListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         foodcategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FoodCategory'
 *     FoodCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         category:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

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
