const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const authRouter = require("./src/routes/auth.routes");
const router = require("./src/routes/products.routes");
const cartRouter = require("./src/routes/cart.routes");
const cors = require("cors");
const fileRouter = require("./src/routes/file.routes");
const { connectDb } = require("./database/connectDatabase");
const { deployedFrontendUrl, localFrontend } = require("./src/api/dotenv");

const app = express();
connectDb();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    origin: [deployedFrontendUrl, localFrontend],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use("/product", router);
app.use("/cart", cartRouter);
app.use("/file", fileRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
