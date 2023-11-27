const { Schema, model } = require("mongoose");

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must've a name!"],
      unique: true,
    },

    duration: {
      type: String,
      required: [true, "A tour must've a duration!"],
    },

    difficulty: {
      type: String,
      required: [true, "A tour must've a duration!"],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    maxGroupSize: {
      type: Number,
      required: [true, "A tour must've a duration!"],
    },

    price: {
      type: Number,
      required: [true, "A tour must've a duration!"],
    },

    priceDiscount: Number,

    summary: {
      type: String,
      trim: true,
      required: [true, "warning"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "warning"],
    },

    imageCover: {
      type: String,
      required: [true, "warning"],
    },

    images: [String],

    startDates: [Date],
  },

  { timestamps: true }
);

const Tour = model("Tour", tourSchema);

module.exports = Tour;
