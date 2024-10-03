const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const Status = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    const error = appError.create(401, Status.FAIL, "Unauthorized");
    return next(error);
  }

  const token = authToken.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appError.create(401, Status.FAIL, err.message);
    return next(error);
  }
};
module.exports = verifyToken;
