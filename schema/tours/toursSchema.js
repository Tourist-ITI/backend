// cor module
const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    title: {
      type: String,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photos: {
      type: Array,
    },
    expected_photos: { type: Array },

    start_date: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    person_cost: {
      type: Number,
    },
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
    coordinates: { type: "Point", coordinates: [longitude, latitude] },
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
