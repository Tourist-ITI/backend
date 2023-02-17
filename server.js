// core modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

//parsing
const bodyParser = require("body-parser");

//custom modules
const authRouter = require("./routers/auth/user");
const tourRouter = require("./routers/tour/tour");
const { errorHandler } = require("./utils/responseHandler");

//handle dotenv
dotenv.config({
  path: "./config.env",
});

// variables
const port = 3001;
const app = express();

//middleware
// cors
app.use(cors());
//body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

// morgan
app.use(morgan("dev"));
// routes
app.use("/v1/users", authRouter);
app.use("/v1/tours", tourRouter);

// roue not exist
app.all("*", (req, res, next) => {
  next(errorHandler(`can't found route: ${req.originalUrl}`, 404));
});

//database server
mongoose.connect(process.env.DATABASE).then((_) => {
  console.log("database is connected successfully");
});

app.use((err, req, res, next) => {
  console.log("\n<<<<<<<<<<<<<<Error>>>>>>>>>>>>>>\n", err);
  res.status(err.status || 500).send(err.response);
});

app.listen(port, () => console.log(`Server is listening on port : ${port}`));
