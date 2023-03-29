const express = require("express");
const orderItemRoute = express.Router();
const OrderItemWithQuantity = require("../models/order_items_model");

//Order Items with quantity
orderItemRoute.route("/create").post((req, res) => {
  const { orderType } = req.body;
  const orderitemwithquantity = new OrderItemWithQuantity({
    orderType,
  });
  orderitemwithquantity
    .save()
    .then((orderitemwithquantity) => {
      res.status(200).send({ status: "sucess", orderitemwithquantity });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderItemRoute;
