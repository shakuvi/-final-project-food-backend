const express = require("express");
const orderItemRoute = express.Router();
const OrderItemWithQuantity = require("../models/order_items_model");

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
orderItemRoute.route("/get-all").get((req, res) => {
  OrderItemWithQuantity.find()
    .then((orderitemwithquantity) => {
      res.status(200).send({ status: "sucess", orderitemwithquantity });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderItemRoute;
