const Tour = require("../model/Tour.model");

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
  let queryObject = { ...req.query };

  const excludeQueries = ["sort", "page", "limit", "fields"];
  excludeQueries.forEach((curr) => delete queryObject[curr]);

  const queryString = JSON.stringify(queryObject);

  queryObject = JSON.parse(
    queryString.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`) //\b\b for this to run when matches exactly, and g for replacing all
  );

  console.log(queryObject);

  const query = Tour.find(queryObject);

  const tours = await query;

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
