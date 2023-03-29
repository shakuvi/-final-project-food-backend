const express = require("express");
const tableRoute = express.Router();
const Table = require("../models/table_model");

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
