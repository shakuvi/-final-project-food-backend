const express = require("express");
const orderTypeRoute = express.Router();
const OrderType = require("../models/order_type_model");

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
      res.status(200).send({ status: "faliure" });
    });
});

module.exports = orderTypeRoute;
