// if (process.env.NODE_ENV === "development") {
//   require("dotenv").config();
// }
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log("app is listening ", PORT);
});

module.exports = app;
