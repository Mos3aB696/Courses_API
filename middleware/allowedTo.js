const Status = require("../utils/httpStatusText");
const appError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const error = appError.create(403, Status.FORBIDDEN, Status.NOTALLOWED);
      return next(error);
    }
    next();
  };
};
