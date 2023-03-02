const joi = require("joi");
const { errorHandler } = require("../../utils/responseHandler");

const tourSchema = joi.object({
  title: joi.string().required(),
  start_date: joi.date().required(),
  duration: joi.number().required(),
  person_cost: joi.number().required(),
  person_num: joi.number().required(),
  location: joi.string().required(),
  private: joi.bool().required(),
  food: joi.bool().required(),
  walk: joi.bool().required(),
  carbon_neut: joi.bool().required(),
  include: joi.string().required(),
  reasons: joi.array().required(),
  meeting_point: joi.string().alphanum().required(),
  city_highlights: joi.string().alphanum().required(),
  hidden_gems: joi.string().alphanum().required(),
  magical_storytelling: joi.string().alphanum().required(),
  special_treat: joi.string().alphanum().required(),
});

const validTour = async (req, res, next) => {
  try {
    await tourSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};

module.exports = { validTour };
