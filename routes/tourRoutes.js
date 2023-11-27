const { Router } = require("express");

const tourController = require("../controllers/tourController");

const router = Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route("/:id").get(tourController.getTour);

module.exports = router;
