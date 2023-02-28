const express = require("express");

//controllers
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sign-in");
const { getOneUser } = require("../../controllers/users/get_one");
const { updateUser } = require("../../controllers/users/update_user");
const { signupValid, signinValid } = require("../../validation/user/auth");

//image controller
const {
  uploadMultiImages,
} = require("../../middlewares/upload-img/upload-img");

const authRouter = express.Router();

authRouter.post("/sign-up/:role", signupValid, signUp);
authRouter.post("/sign-in/:role", signinValid, signIn);
authRouter.get("/:id", getOneUser);
authRouter.post(
  "/:id",
  uploadMultiImages([
    { name: "photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  updateUser
);

module.exports = authRouter;
