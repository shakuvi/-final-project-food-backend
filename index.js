const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user_route");
const tableRoute = require("./routes/table_route");
const orderTypeRoute = require("./routes/order_type_route");
const orderRoute = require("./routes/order_route");

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database Successfully"));

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/table", tableRoute);
app.use("/ordertype", orderTypeRoute);
app.use("/order", orderRoute);

app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
