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
employeeRoute.route("/get-all").get(verifyToken, (req, res) => {
  console.log(req.user);
  const { employeeType } = req.user;
  if (employeeType === "owner") {
    Employee.find()
      .populate("employeeType")
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

//update employee
employeeRoute.route("/update").post(verifyToken, (req, res) => {
  const { employee } = req.body;
  console.log(req.user);
  const { employeeType } = req.user;

  if (employeeType === "owner") {
    console.log(employee);
    Employee.findByIdAndUpdate(employee._id, employee)
      .then((employee) => {
        res.status(200).send({ status: "sucess", employee });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({ status: "faliure" });
      });
  } else {
    res.status(403).send({ status: "Unautorized" });
  }
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
            token,
            employee: {
              userName: employee.userName,
              employeeType: employee.employeeType.employeeType,
            },
          });
        } else {
          res.status(404).send({
            status: "fail",
            message: "Username or Password incorrect",
          });
        }
      } else {
        res.status(403).send({ status: "fail", message: "User not found" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "fail", message: "Error " });
    });
});

module.exports = employeeRoute;
