const express = require("express");
const coursesControllers = require("../controllers/courses.controllers");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRole = require("../utils/userRole");

const router = express.Router();
router
  .route("/")
  .get(coursesControllers.getCourses)
  .post(
    verifyToken,
    allowedTo(userRole.ADMIN),
    coursesControllers.createCourse
  );

router
  .route("/:courseId")
  .get(coursesControllers.getCourse)
  .patch(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    coursesControllers.updateCourse
  )
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN),
    coursesControllers.deleteCourse
  );

module.exports = router;
