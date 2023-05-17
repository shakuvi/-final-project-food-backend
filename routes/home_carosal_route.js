const express = require("express");
const homeCarosalRoute = express.Router();
const HomeCarosal = require("../models/home_carosal_model");

/**
 * @swagger
 * tags:
 *   name: Home Carosal
 *   description: API endpoints for managing home carosal images
 */

/**
 * @swagger
 * /homecarosal/create:
 *   post:
 *     summary: Create a new carosal image
 *     tags: [Home Carosal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomeCarosalCreateRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomeCarosalResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /homecarosal/get-all:
 *   get:
 *     summary: Get all carosal images
 *     tags: [Home Carosal]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomeCarosalListResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HomeCarosalCreateRequest:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *     HomeCarosalResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         homecarosal:
 *           $ref: '#/components/schemas/HomeCarosal'
 *     HomeCarosalListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         homecarosal:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HomeCarosal'
 *     HomeCarosal:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         image:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 */

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
  HomeCarosal.find()
    .then((homecarosal) => {
      res.status(200).send({ status: "sucess", homecarosal });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "faliure" });
    });
});

module.exports = homeCarosalRoute;
