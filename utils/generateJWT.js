const jwt = require("jsonwebtoken");

module.exports = (payload) => {
  // ! jwt.sing() => not asynchronous so you can't use await here (&_&)
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return token;
};
