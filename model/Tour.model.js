const { Schema, model } = require("mongoose");

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must've a name!"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Tour = model("Tour", tourSchema);

module.exports = Tour;
