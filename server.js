const express = require("express");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDB = require("./config/db");

// connect DB
connectDB();

// Load Routes
app.use("/api/v1/products", require("./routes/products"));

const PORT = process.env.PORT || 5000;

app.listen(5000, () =>
  console.log(
    `Server Started on port ${PORT} in ${process.env.NODE_ENV} mode...`
  )
);
