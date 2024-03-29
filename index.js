const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user_route");
const tableRoute = require("./routes/table_route");
const orderTypeRoute = require("./routes/order_type_route");
const orderRoute = require("./routes/order_route");
const orderItemRoute = require("./routes/order_items_route");
const foodRoute = require("./routes/food_route");
const foodcatergoryRoute = require("./routes/food_category_route");
const feedbackRoute = require("./routes/feedback_route");
const employeeRoute = require("./routes/employee_route");
const recommendationRoute = require("./routes/recomandation_route");
const homeCarosalRoute = require("./routes/home_carosal_route");
const employeeTypeRoute = require("./routes/employee_type_route");
const imegeUploadRoute = require("./routes/image_upload_route");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food-Backend",
      version: "1.0.0",
      description: "API documentation for your project",
    },

  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database Successfully"));

app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/table", tableRoute);
app.use("/ordertype", orderTypeRoute);
app.use("/order", orderRoute);
app.use("/orderitems", orderItemRoute);
app.use("/food", foodRoute);
app.use("/foodcatergory", foodcatergoryRoute);
app.use("/feedback", feedbackRoute);
app.use("/employee", employeeRoute);
app.use("/recommendation", recommendationRoute);
app.use("/homecarosal", homeCarosalRoute);
app.use("/emptype", employeeTypeRoute);
app.use("/imgupload", imegeUploadRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
