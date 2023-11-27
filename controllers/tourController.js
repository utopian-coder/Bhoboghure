const Tour = require("../model/Tour.model");

exports.getAllTours = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Get all tours",
    },
  });
};

exports.getTour = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Get a tour",
    },
  });
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
