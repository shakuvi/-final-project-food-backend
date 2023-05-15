const express = require("express");
const employeeTypeRoute = express.Router();
const employeeType = require("../models/employee_type_model");

//View all feedbacks
employeeTypeRoute.route("/get-all").get((req, res) => {
  employeeType
    .find()
    .then((employeetype) => {
      res.status(200).send({ status: "sucess", employeetype });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = employeeTypeRoute;
