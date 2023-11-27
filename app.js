//Third party package imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

//imports from project code
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express(); //Creating the express server

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*This makes public directory the root for serving static file,
request can be done to http://localhost:port/path to get the static file.
app.use(express.static(`${__dirname}/public`));
*/

app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
