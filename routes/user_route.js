const express = require("express");
const userRoute = express.Router();
const User = require("../models/user_model");
const _ = require("lodash");

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
  } = JSON.parse(req.body.user);
  console.log(req.body.user);
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
userRoute.route("/sign-in").post((req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        const { firstName, lastName, _id, email, mobileNumber, dateOfBirth } =
          user;
        const sendUser = {
          firstName,
          lastName,
          _id,
          email,
          mobileNumber,
          dateOfBirth,
        };

        res.status(200).send({
          status: "login-sucess",
          user: sendUser,
        });
      } else {
        res
          .status(401)
          .send({ status: "User not found", errorMsg: "User not found" });
      }
    })
    .catch((e) => {
      res.status(400).send({
        status: "Bad request",
        errorMsg: "Username or password incorrect",
      });
    });
});

module.exports = userRoute;
