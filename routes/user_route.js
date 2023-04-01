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

//View all users
userRoute.route("/get-all").get((req, res) => {
  User.find()
    .then((user) => {
      res.status(200).send({ status: "sucess", user });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//User sign-in
userRoute.route("/sign-in").get((req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        res.status(200).send({
          status: "login-sucess",
          userID: user._id,
          useName: user.userName,
        });
      } else {
        res.status(401).send({ status: "User not found" });
      }
    })
    .catch((e) => {
      res.status(400).send({ status: "Bad request" });
    });
});

module.exports = userRoute;
