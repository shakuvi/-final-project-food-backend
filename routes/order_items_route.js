const express = require("express");
const orderItemRoute = express.Router();
const OrderItemWithQuantity = require("../models/order_items_model");

/**
 * @swagger
 * /order-items/create:
 *   post:
 *     summary: Create an order item with quantity
 *     tags: [Order Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderID:
 *                 type: string
 *               food:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 orderitemwithquantity:
 *                   $ref: '#/components/schemas/OrderItemWithQuantity'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order-items/get-all-by-order-id:
 *   post:
 *     summary: Get all order items by order ID
 *     tags: [Order Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 orderitemwithquantity:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderItemWithQuantity'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//Order Items with quantity
orderItemRoute.route("/create").post((req, res) => {
  const { orderID, food, price, quantity } = req.body;
  const orderitemwithquantity = new OrderItemWithQuantity({
    orderID,
    food,
    price,
    quantity,
  });
  orderitemwithquantity
    .save()
    .then((orderitemwithquantity) => {
      res.status(200).send({ status: "success", orderitemwithquantity });
    })
    .catch((e) => {
      res.status(400).send({ status: "failure" });
    });
});

//View all food items
orderItemRoute.route("/get-all-by-order-id").post((req, res) => {
  const { orderId } = req.body;
  OrderItemWithQuantity.find({ orderID: orderId })
    .populate("food")
    .then((orderitemwithquantity) => {
      res.status(200).send({ status: "sucess", orderitemwithquantity });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderItemRoute;
