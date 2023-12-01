const slugify = require("slugify");
const { Schema, model } = require("mongoose");

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must've a name!"],
      unique: true,
      minLength: 12,
      maxLength: 45,
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
      max: 5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
      min: 0,
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

    slug: String,
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationInWeeks").get(function () {
  const durationInDays = this.duration.split(" ").at(0); //duration: '7 days'
  const weeks = Math.floor(durationInDays / 7);
  const days = durationInDays % 7;

  return `${weeks}W ${days}D`;
});

//DOCUMENT MIDDLEWARE: Runs before create() or save()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = model("Tour", tourSchema);

module.exports = Tour;
