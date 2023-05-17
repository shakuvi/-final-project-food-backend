const express = require("express");
const foodRoute = express.Router();
const Food = require("../models/food_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: API endpoints for managing food items
 */

/**
 * @swagger
 * /food/create:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodResponse'
 *       400:
 *         description: Failure operation
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
 * /food/get-all:
 *   get:
 *     summary: Get all food items
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodListResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /food/get-food-by-category-id:
 *   post:
 *     summary: Get food items by category ID
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodByCategoryRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodListResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /food/update:
 *   post:
 *     summary: Update a food item
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodResponse'
 *       400:
 *         description: Failure operation
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
 *     FoodRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         category:
 *           type: string
 *     FoodResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         food:
 *           $ref: '#/components/schemas/Food'
 *     FoodListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         foods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Food'
 *     FoodByCategoryRequest:
 *       type: object
 *       properties:
 *         category:
 *           type: string
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
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

module.exports = foodRoute;

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
