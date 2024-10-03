const express = require("express");
const userController = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");
const userRole = require("../utils/userRole");
const allowedTo = require("../middleware/allowedTo");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        uniqueSuffix +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File Type Not Supported"));
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const router = express.Router();

router
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    userController.getAllUsers
  );
router
  .route("/register")
  .post(upload.single("avatar"), userController.register);
router.route("/login").post(userController.login);
router
  .route("/:userId")
  .delete(verifyToken, allowedTo(userRole.ADMIN), userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
