require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Status = require("./utils/httpStatusText");
const path = require("node:path");
let app = express();

// ? [ sequelize npm ] If want use SQL Instead Of NoSQL

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log("Failed To Connecting To MongoDB >>> : ", err);
  });

/**
 * ! Important Of express.json() Function
  ** Parsing JSON Requests: When you call app.use(express.json()), Express sets up middleware that
    parses incoming requests with JSON payloads. This means that Express automatically converts
    the request body from JSON format into a JavaScript object.
  ** Automatic Request Body Parsing: Without this middleware, you would need to manually parse 
    the JSON body of each incoming request. This middleware saves you from having to write 
    custom parsing logic for every route handler.
  ** Simplicity in Route Handlers: With this middleware, you don't need to worry about parsing JSON in your route handlers.
    You can directly access the parsed data using req.body.
 */

app.use(cors());
app.use(express.json());

const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// Global middleware to handle not found routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: Status.ERROR,
    data: null,
    message: "Page Not Found",
    code: 404,
  });
});
/**
 * ! This middleware handle the err response [error message]
 * @param err => recived it from asyncWrapper function [pass it in next(err)]
 */
app.use((err, req, res, next) => {
  res.status(err.statusCode || 400).json({
    status: err.statusMsg || Status.ERROR,
    data: null,
    message: err.message,
    code: err.statusCode || 400,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listen On Port 2500");
});
