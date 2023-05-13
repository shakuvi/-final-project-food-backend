const express = require("express");
const homeCarosalRoute = express.Router();
const HomeCarosal = require("../models/home_carosal_model");

//Craete Iamge
homeCarosalRoute.route("/create").post((req, res) => {
  const { image } = req.body;
  const homecarosal = new HomeCarosal({
    image,
  });
  homecarosal
    .save()
    .then((homecarosal) => {
      res.status(200).send({ status: "sucess", homecarosal });
    })
    .catch((e) => {
      res.status(400).send({ status: "faliure" });
    });
});

//View Images
homeCarosalRoute.route("/get-all").get((req, res) => {
  Food.find()
    .then((homecarosal) => {
      res.status(200).send({ status: "sucess", homecarosal });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = homeCarosalRoute;
