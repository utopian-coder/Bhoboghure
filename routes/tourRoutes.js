const { Router } = require("express");

const tourController = require("../controllers/tourController");

const router = Router();

router
  .route("/top-3-cheap-tour")
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-tours/:year").get(tourController.getMonthlyTours);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
