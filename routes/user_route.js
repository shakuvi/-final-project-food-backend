const express = require("express");
const userRoute = express.Router();
const User = require("../models/user_model");
const _ = require("lodash");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /user/sign-in:
 *   post:
 *     summary: User sign-in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignInRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignInResponse'
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         mobileNumber:
 *           type: string
 *         password:
 *           type: string
 *     UserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *     UserListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *     UserSignInRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserSignInResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         mobileNumber:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         errorMsg:
 *           type: string
 */

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
