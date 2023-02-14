const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");
const shortid = require("shortid"); //for generate  unique id
const paymentRoute = require("./routes/payment.route");

app.use(cors()); //For avoiding CORS Error

app.use(express.json());

app.use("/", paymentRoute);

app.listen(8000, () => {
  console.log("Connection established");
});
