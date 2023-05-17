const express = require("express");
const employeeTypeRoute = express.Router();
const employeeType = require("../models/employee_type_model");

/**
 * @swagger
 * tags:
 *   name: Employee Type
 *   description: API endpoints for managing employee types
 */

/**
 * @swagger
 * /emptype/get-all:
 *   get:
 *     summary: Get all employee types
 *     tags: [Employee Type]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeTypeResponse'
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
 *     EmployeeTypeResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         employeetype:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EmployeeType'
 *     EmployeeType:
 *       type: object
 *       properties:
 *         // Specify the properties of the employee type object here
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

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
