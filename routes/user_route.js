const express = require("express");
const userRoute = express.Router();
const User = require("../models/user_model");

//Save Users to database
userRoute.route("/create").post((req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    dateOfBirth,
    mobileNumber,
    password,
  } = req.body;
  const user = new User({
    firstName,
    lastName,
    userName,
    email,
    dateOfBirth,
    mobileNumber,
    password,
  });
  user
    .save()
    .then((user) => {
      res.status(200).send({ status: "sucess", user });
    })
    .catch((e) => {
      res.status(200).send({ status: "faliure" });
    });
});

module.exports = userRoute;
