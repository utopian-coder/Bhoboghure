const slugify = require("slugify");
const { Schema, model } = require("mongoose");

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must've a name!"],
      unique: true,
      trim: true,
      minLength: [12, "Name must be greater than 12 characters."],
      maxLength: [45, "Name must be lesser than 46 characters. "],
    },

    duration: {
      type: String,
      required: [true, "A tour must've a duration!"],
    },

    difficulty: {
      type: String,
      required: [true, "A tour must've a duration!"],
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Tours can be only easy, medium or hard.",
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, "Max rating 5.0"],
      min: [1, "Min rating 1.0"],
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

    priceDiscount: {
      type: Number,
      validate: {
        message: "Price discount must be less than equal to the actual price.",
        validator: function (val) {
          return val <= this.price;
        },
      },
    },

    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must've a summary"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "A tour must've a description"],
    },

    imageCover: {
      type: String,
      required: [true, "A tour must've a image cover."],
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
