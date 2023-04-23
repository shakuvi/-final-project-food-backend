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

//View all orders
orderRoute.route("/get-all").get((req, res) => {
  Order.find()
    .populate("orderedBy", "userName")
    .populate("orderType", "orderType")
    .populate("table", "tableName")
    .populate("handleBy", "userName")
    .then((order) => {
      res.status(200).send({ status: "sucess", order });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "faliure" });
    });
});

//update orderStatus
orderRoute.route("/update").post((req, res) => {
  const { id, status } = req.body;
  Order.findByIdAndUpdate(id, { status: status }, { new: true })
    .then((order) => {
      res.status(200).send({ status: "sucess", order });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = orderRoute;
