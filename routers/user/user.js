const express = require("express");

const { getOneUser } = require("../../controllers/users/get_one");

const userRouter = express.Router();

userRouter.get("/:id", getOneUser);