const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database Successfully"));

app.use(express.json());

app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
