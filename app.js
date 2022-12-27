require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
const passport = require("passport");
require("./app_api/models/db");
require("./app_api/config/passport");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
var app = express();
app.use(passport.initialize());
var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var apiRouter = require("./app_api/routes/index");
app.use(
  session({
    secret: "gizli",
    cookie: { maxAge: 1000 * 60 * 1 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ hata: err.name + ": " + err.message });
  }
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;
