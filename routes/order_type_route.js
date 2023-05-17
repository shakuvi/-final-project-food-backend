const express = require("express");
const orderTypeRoute = express.Router();
const OrderType = require("../models/order_type_model");

/**
 * @swagger
 * tags:
 *   name: Order Type
 *   description: API endpoints for managing order types
 */

/**
 * @swagger
 * /orderType/create:
 *   post:
 *     summary: Create a new order type
 *     tags: [Order Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderTypeRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderTypeResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /orderType/get-all:
 *   get:
 *     summary: Get all order types
 *     tags: [Order Type]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderTypeResponse'
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
 *     OrderTypeRequest:
 *       type: object
 *       properties:
 *         orderType:
 *           type: string
 *     OrderTypeResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         ordertype:
 *           $ref: '#/components/schemas/OrderType'
 *     OrderType:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         orderType:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         errorMsg:
 *           type: string
 */

//Add order type to databse
orderTypeRoute.route("/create").post((req, res) => {
  const { orderType } = req.body;
  const ordertype = new OrderType({
    orderType,
  });
  ordertype
    .save()
    .then((ordertype) => {
      res.status(200).send({ status: "sucess", ordertype });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View order types
orderTypeRoute.route("/get-all").get((req, res) => {
  OrderType.find()
    .then((ordertype) => {
      res.status(200).send({ status: "sucess", ordertype });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderTypeRoute;
