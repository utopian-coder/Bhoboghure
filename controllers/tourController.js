const Tour = require("../model/Tour.model");
const APIFeatures = require("../utils/APIFeatures");

exports.aliasTopTour = (req, res, next) => {
  req.query = {
    ...req.query,
    limit: 3,
    sort: "price,-ratingsAverage",
  };

  next();
};

exports.createTour = async (req, res, next) => {
  const newTour = await Tour.create({
    ...req.body,
  });

  res.status(200).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
};

exports.getAllTours = async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tour.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.updateTour = async (req, res, next) => {
  const { id } = req.params;
  const updatedTour = await Tour.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: "success",
    data: {
      updatedTour,
    },
  });
};

exports.deleteTour = async (req, res, next) => {
  const { id } = req.params;
  await Tour.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    message: "Successfully deleted the tour!",
  });
};
