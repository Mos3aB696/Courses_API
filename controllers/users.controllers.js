const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/user.model");
const Status = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: Status.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, role, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(400, Status.FAIL, "User Already Exists");
    return next(error);
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    role,
    password: hashedPass,
    avatar: req.file.filename,
  });
  // generateJWT token
  const token = generateJWT({ email: newUser.email, id: newUser._id });
  newUser.token = token;

  await newUser.save();

  res.status(201).json({ status: Status.SUCCESS, data: { newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = appError.create(400, Status.FAIL, "User Not Found");
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = appError.create(400, Status.FAIL, "Wrong Password");
    return next(error);
  }
  if (user && isMatch) {
    // generateJWT
    const token = generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.status(200).json({
      status: Status.SUCCESS,
      data: { token },
    });
  } else {
    const error = appError.create(400, Status.FAIL, "Invalid Credentials");
    return next(error);
  }
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const updated = await User.findByIdAndUpdate(
    userId,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!updated || updated === null) {
    const error = appError.create(404, Status.FAIL, Status.USERNOTFOUND);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: Status.SUCCESS, data: { user: updated } });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const existingUser = await User.deleteOne({ _id: userId });

  if (existingUser.deletedCount == 0) {
    const error = appError.create(404, Status.FAIL, Status.USERNOTFOUND);
    return next(error);
  }
  res.status(200).json({
    status: Status.SUCCESS,
    data: null,
    message: "User Deleted Successfully",
    code: 200,
  });
});

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser,
  updateUser,
};
