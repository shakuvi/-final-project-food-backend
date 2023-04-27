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
    .then((employee) => {
      res.status(200).send({ status: "sucess", employee });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View all employees
employeeRoute.route("/get-all").get((req, res) => {
  Employee.find()
    .then((employee) => {
      res.status(200).send({ status: "sucess", employee });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//update employee
employeeRoute.route("/update").post((req, res) => {
  const { employee } = req.body;
  console.log(employee);
  Employee.findByIdAndUpdate(employee._id, employee)
    .then((employee) => {
      res.status(200).send({ status: "sucess", employee });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "faliure" });
    });
});

//employee sign-in
employeeRoute.route("/sign-in").get((req, res) => {
  const { email, password } = req.body;
  Employee.findOne({ email: email, password: password })
    .then((employee) => {
      if (employee) {
        res.status(200).send({
          status: "login-sucess",
          userID: employee._id,
          useName: employee.userName,
        });
      } else {
        res.status(401).send({ status: "User not found" });
      }
    })
    .catch((e) => {
      res.status(400).send({ status: "Bad request" });
    });
});

module.exports = employeeRoute;
