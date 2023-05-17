const express = require("express");
const tableRoute = express.Router();
const Table = require("../models/table_model");

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: API endpoints for managing tables
 */

/**
 * @swagger
 * /table/create:
 *   post:
 *     summary: Create a new table
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TableRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableResponse'
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /table/get-all:
 *   get:
 *     summary: Get all tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableResponse'
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
 *     TableRequest:
 *       type: object
 *       properties:
 *         tableName:
 *           type: string
 *     TableResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         table:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Table'
 *     Table:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tableName:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         errorMsg:
 *           type: string
 */

//Add tables to database
tableRoute.route("/create").post((req, res) => {
  const { tableName } = req.body;
  const table = new Table({
    tableName,
  });
  table
    .save()
    .then((user) => {
      res.status(200).send({ status: "sucess", user });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View all tables
tableRoute.route("/get-all").get((req, res) => {
  Table.find()
    .then((table) => {
      res.status(200).send({ status: "sucess", table });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = tableRoute;
