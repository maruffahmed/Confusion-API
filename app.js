// 3rd party modules
var express = require("express");
var createError = require("http-errors");
var logger = require("morgan");
var passport = require("passport");
const mongoose = require("mongoose");

var authenticate = require("./authenticate");

// Routes
var indexRouter = require("./routes/index.router");
var usersRouter = require("./routes/users.router");
const disRouter = require("./routes/dish.router");
const promoRouter = require("./routes/promo.router");
const leadersRouter = require("./routes/leader.router");
const uploadRouter = require("./routes/upload.router");

// API docs route (Swagger)
const { swaggerDocs: v1SwaggerDocs } = require("./swagger");

// dot env config
require("dotenv").config();

// Config file
const mongoDbUrl = process.env.MONGO_URL || "";
// DB connection
const mongoConnect = mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// DB connection event handlers
mongoConnect.then(
  (db) => {
    console.log("Database connected correctly");
  },
  (err) => {
    console.log(err);
  }
);

// Express app
var app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Authentication
app.use(passport.initialize());

// API Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", disRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leadersRouter);
app.use("/imageUpload", uploadRouter);
// API docs route (Swagger)
v1SwaggerDocs(app, process.env.PORT || "3000");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Url not found"));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ error: err });
});

module.exports = app;
