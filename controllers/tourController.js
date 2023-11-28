const Tour = require("../model/Tour.model");

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
  let queryObject = { ...req.query };

  const excludeQueries = ["sort", "page", "limit", "fields"];
  excludeQueries.forEach((curr) => delete queryObject[curr]);

  const queryString = JSON.stringify(queryObject);

  queryObject = JSON.parse(
    queryString.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`) //\b\b for this to run when matches exactly, and g for replacing all
  );

  const query = Tour.find(queryObject);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query.sort(sortBy);
  } else {
    query.sort("-createdAt");
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query.select(fields);
  } else {
    query.select("-__v");
  }

  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  if (req.query.page) {
    const numberOfDocs = await Tour.countDocuments();

    if (skip >= numberOfDocs) {
      return res.status(404).json({
        status: "fail",
        message: "The page doesn't exist!",
      });
    }
  }

  query.skip(skip).limit(limit);

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
