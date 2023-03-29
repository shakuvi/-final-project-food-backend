const express = require("express");
const employeeRoute = express.Router();
const Employee = require("../models/employee_model");

//Add feedback
employeeRoute.route("/create").post((req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    dateOfBirth,
    mobileNumber,
    password,
  } = req.body;
  const employee = new Employee({
    firstName,
    lastName,
    userName,
    email,
    dateOfBirth,
    mobileNumber,
    password,
  });
  employee
    .save()
    .then((feedback) => {
      res.status(200).send({ status: "sucess", employee });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = employeeRoute;
