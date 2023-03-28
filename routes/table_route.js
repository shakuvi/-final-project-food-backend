const express = require("express");
const tableRoute = express.Router();
const Table = require("../models/table_model");

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

module.exports = tableRoute;
