const express = require("express");
const orderRoute = express.Router();
const Order = require("../models/order_model");

//Create food order
orderRoute.route("/create").post((req, res) => {
  const {
    createDate,
    createTime,
    status,
    orderedBy,
    billValue,
    discount,
    orderType,
    table,
    handleBy,
  } = req.body;
  const order = new Order({
    createDate,
    createTime,
    status,
    orderedBy,
    billValue,
    discount,
    orderType,
    table,
    handleBy,
  });
  order
    .save()
    .then((order) => {
      res.status(200).send({ status: "sucess", order });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderRoute;
