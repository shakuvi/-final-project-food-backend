const express = require("express");
const employeeRoute = express.Router();
const Employee = require("../models/employee_model");
const { verifyToken } = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: API endpoints for managing employees
 */

/**
 * @swagger
 * /employee/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /employee/get-all:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /employee/update:
 *   post:
 *     summary: Update an employee
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /employee/sign-in:
 *   post:
 *     summary: Sign in as an employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInInput'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeInput:
 *       type: object
 *
 *       properties:
 *         employee:
 *           type: object
 *           properties:
 *             // Specify the properties of the employee object here
 *       required:
 *         - employee
 *     EmployeeResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         employee:
 *           $ref: '#/components/schemas/Employee'
 *     Employee:
 *       type: object
 *       properties:
 *         // Specify the properties of the employee object here
 *     SignInInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     SignInResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         token:
 *           type: string
 *         employee:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             employeeType:
 *               type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

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
        console.log(e);
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

// //employee sign-in
// employeeRoute.route('/sign-in').post((req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);
//   Employee.findOne({ email: email })
//     .populate('employeeType')
//     .then(employee => {
//       if (employee) {

//         if (Employee.comparePassword(password)) {
//           const token = jwt.sign(
//             {
//               id: employee._id,
//               employeeType: employee.employeeType.employeeType,
//             },
//             process.env.SECRETKEY,
//           );
//           res.status(200).send({
//             status: 'login-sucess',
//             token,
//             employee: {
//               userName: employee.userName,
//               employeeType: employee.employeeType.employeeType,
//             },
//           });
//         } else {
//           res.status(404).send({
//             status: 'fail',
//             message: 'Username or Password incorrect',
//           });
//         }
//       } else {
//         res.status(403).send({ status: 'fail', message: 'User not found' });
//       }
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(400).send({ status: 'fail', message: 'Error ' });
//     });
// });

employeeRoute.route("/sign-in").post((req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  Employee.findOne({ email: email })
    .populate("employeeType")
    .then((employee) => {
      if (employee) {
        // Create an instance of the Employee model
        const employeeInstance = new Employee(employee);

        // Call the comparePassword method on the employeeInstance
        employeeInstance
          .comparePassword(password)
          .then((isMatch) => {
            if (isMatch) {
              const token = jwt.sign(
                {
                  id: employee._id,
                  employeeType: employee.employeeType.employeeType,
                },
                process.env.SECRETKEY
              );
              res.status(200).send({
                status: "login-success",
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
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send({ status: "fail", message: "Error" });
          });
      } else {
        res.status(403).send({ status: "fail", message: "User not found" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "fail", message: "Error" });
    });
});

module.exports = employeeRoute;
