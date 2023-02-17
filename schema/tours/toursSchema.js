// cor module
const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    title: String,
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photos: {
      type: Array,
    },
    expected_photos: { type: Array },
    start_date: Date,
    duration: Number,
    person_cost: Number,
    person_num: {
      type: Number,
    },
    location: {
      type: String,
    },
    private: {
      type: Boolean,
    },
    food: {
      type: Boolean,
    },
    walk: {
      type: Boolean,
    },
    carbon_neut: {
      type: Boolean,
    },
    include: {
      type: String,
    },
    reasons: {
      type: Array,
    },
    plan: {
      meeting_point: String,
      city_highlights: String,
      hidden_gems: String,
      magical_storytelling: String,
      special_treat: String,
    },
    coordinates: Array,
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

tourSchema.virtual("rate", {
  ref: "Comments",
  foreignField: "comment_id",
  localField: "_id",
});

module.exports = tourSchema;
