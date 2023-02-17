const joi = require("joi");
const { errorHandler } = require("../../utils/responseHandler");

const tourCreateSchema = joi.object({
  title: joi.string().required(),
  photo: joi.required(),
  expected_photos: joi.required(),
  start_date: joi.date().required(),
  duration: joi.number().required(),
  person_cost: joi.number().required(),
  location: joi.string().required(),
  private: joi.bool().required(),
  food: joi.bool().required(),
  walk: joi.bool().required(),
  carbon_neut: joi.bool().required(),
  include: joi.string().required(),
  reasons: joi.string().required(),
  coordinates: joi.string().required(),
  meeting_point: joi.string().alphanum().required(),
  city_highlights: joi.string().alphanum().required(),
  hidden_gems: joi.string().alphanum().required(),
  magical_storytelling: joi.string().alphanum().required(),
  special_treat: joi.string().alphanum().required(),
});
const tourEditSchema = joi.object({
  title: joi.string(),
  photo: joi.array(),
  expected_photos: joi.array(),
  start_date: joi.date(),
  duration: joi.number(),
  person_cost: joi.number(),
  location: joi.string(),
  private: joi.bool(),
  food: joi.bool(),
  walk: joi.bool(),
  carbon_neut: joi.bool(),
  include: joi.string(),
  reasons: joi.string(),
  coordinates: joi.string(),
  meeting_point: joi.string().alphanum(),
  city_highlights: joi.string().alphanum(),
  hidden_gems: joi.string().alphanum(),
  magical_storytelling: joi.string().alphanum(),
  special_treat: joi.string().alphanum(),
});

const validCreateTour = async (req, res, next) => {
  try {
    await tourCreateSchema.validateAsync(req.body);
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};
const validEditTour = async (req, res, next) => {
  try {
    await tourEditSchema.validateAsync(req.body);
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};
module.exports = { validCreateTour, validEditTour };
