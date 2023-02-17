const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { createTour } = require("../../controllers/tour/create_tour");
const { deleteOneTour } = require("../../controllers/tour/delete_one");
const { getAllTours } = require("../../controllers/tour/get_all");
const { getOneTour } = require("../../controllers/tour/get_one");
const { updateTour } = require("../../controllers/tour/update_tour");
//controllers
const {
  uploadMultiImages,
} = require("../../middlewares/upload-img/upload-img");
const { validTour } = require("../../validation/user/tour");

const tourRouter = express.Router();

tourRouter.post(
  "/",
  protect,
  uploadMultiImages([
    { name: "photos", maxCount: 4 },
    { name: "expected_photos", maxCount: 4 },
  ]),
  validTour,
  createTour
);
tourRouter.put(
  "/:id",
  protect,
  uploadMultiImages([
    { name: "photos", maxCount: 4 },
    { name: "expected_photos", maxCount: 4 },
  ]),
  validTour,
  updateTour
);
tourRouter.get("/:id", protect, getOneTour);
tourRouter.delete("/:id", protect, deleteOneTour);
tourRouter.get("/", protect, getAllTours);

module.exports = tourRouter;
