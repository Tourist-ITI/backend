const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { createTour } = require("../../controllers/tour/create_tour");
const { updateTour } = require("../../controllers/tour/update_tour");
//controllers
const {
  uploadMultiImages,
} = require("../../middlewares/upload-img/upload-img");
const {
  validEditTour,
  validCreateTour,
} = require("../../validation/user/tour");

const tourRouter = express.Router();

tourRouter.post(
  "/",
  protect,
  uploadMultiImages([
    { name: "photos", maxCount: 4 },
    { name: "expected_photos", maxCount: 4 },
  ]),
  // validCreateTour,
  createTour
);
tourRouter.put(
  "/:id",
  protect,
  uploadMultiImages([
    { name: "photos", maxCount: 4 },
    { name: "expected_photos", maxCount: 4 },
  ]),
  // validEditTour,
  updateTour
);
module.exports = tourRouter;
