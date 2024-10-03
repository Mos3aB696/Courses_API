const asyncWrapper = require("../middleware/asyncWrapper");
const Course = require("../models/course.model");
const Status = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const getCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: Status.SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = AppError.create(404, Status.FAIL, Status.COURSENOTFOUND);
    return next(error);
  }
  res.json({ status: Status.SUCCESS, data: { course } });
});

const createCourse = asyncWrapper(async (req, res) => {
  const course = new Course(req.body);
  const saveCourse = await course.save();
  res
    .status(201)
    .json({ status: Status.SUCCESS, data: { course: saveCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const index = req.params.courseId;
  // ? Way One By Using findByIdAndUpdate
  const updated = await Course.findByIdAndUpdate(
    index,
    { ...req.body },
    { new: true, runValidators: true }
  );
  // ? Way Two By Using updateOne
  // const updated = await Course.updateOne({ _id: index }, { ...req.body });

  if (!updated || updated === null) {
    const error = AppError.create(404, Status.FAIL, Status.COURSENOTFOUND);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: Status.SUCCESS, data: { course: updated } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const existingCourse = await Course.deleteOne({ _id: courseId });
  if (existingCourse.deletedCount == 0) {
    const error = AppError.create(404, Status.FAIL, Status.COURSENOTFOUND);
    return next(error);
  }
  res.status(200).json({
    status: Status.SUCCESS,
    data: null,
    message: "Course Deleted Successfully",
    code: 200,
  });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
