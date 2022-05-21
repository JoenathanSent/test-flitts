const router = require("express").Router();
const userRoutes = require("./user");
const movieRoutes = require("./movie");
const authentication = require("../middlewares/authentication");
const errHandler = require("../middlewares/errHandler");

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
router.use(errHandler);

module.exports = router;
