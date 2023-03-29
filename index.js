const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user_route");
const tableRoute = require("./routes/table_route");
const orderTypeRoute = require("./routes/order_type_route");
const orderRoute = require("./routes/order_route");
const orderItemRoute = require("./routes/order_items_route");
const foodRoute = require("./routes/food_route");
const foodcatergoryRoute = require("./routes/food_category_route");
const feedbackRoute = require("./routes/feedback_route");
const employeeRoute = require("./routes/employee_route");

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
app.use("/orderitems", orderItemRoute);
app.use("/food", foodRoute);
app.use("/foodcatergory", foodcatergoryRoute);
app.use("/feedback", feedbackRoute);
app.use("/employee", employeeRoute);

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
