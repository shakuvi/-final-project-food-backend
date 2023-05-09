const express = require("express");
const employeeRoute = express.Router();
const Employee = require("../models/employee_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

//Add feedback
employeeRoute.route("/create").post(verifyToken, (req, res) => {
  console.log(req.user);
  const { employee } = req.body;
  const { employeeType } = req.user;

  if (employeeType === "owner") {
    const newEmployee = new Employee({ ...employee });
    newEmployee
      .save()
      .then((employee) => {
        res.status(200).send({ status: "sucess", employee });
      })
      .catch((e) => {
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
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
employeeRoute.route("/sign-in").post((req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  Employee.findOne({ email: email })
    .populate("employeeType")
    .then((employee) => {
      if (employee) {
        console.log(employee);
        if (employee.password === password) {
          console.log(employee.employeeType.employeeType);
          const token = jwt.sign(
            {
              id: employee._id,
              employeeType: employee.employeeType.employeeType,
            },
            process.env.SECRETKEY
          );
          res.status(200).send({
            status: "login-sucess",
            userName: employee.userName,
            employeeType: employee.employeeType.employeeType,
            token,
          });
        } else {
          res.status(404).send({ status: "password-incorrect" });
        }
      } else {
        res.status(403).send({ status: "User not found" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "Bad request" });
    });
});

module.exports = employeeRoute;
