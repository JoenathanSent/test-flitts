const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/search", movieController.getMovies);
router.get("/detail", movieController.getMovieDetail);

module.exports = router;
