// core modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

//custom modules
const authRouter = require("./routers/auth/user");

//handle dotenv
dotenv.config({
  path: "./config.env",
});

// variables
const port = 3001;
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/v1/users", authRouter);

//database server
mongoose.connect(process.env.DATABASE).then((_) => {
  console.log("database is connected successfully");
});

app.use((err, req, res, next) => {
  console.log("<<<<Error>>>>", err);
  res.status(err.status || 500).send(err.response);
});

app.listen(port, () => console.log(`Server is listening on port : ${port}`));
