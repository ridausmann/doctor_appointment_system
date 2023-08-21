const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationsController,
  deleteAllNotificationsController,
  getAllDoctorsController,
  bookAppointmentController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router obj
const router = express.Router();

//routes
//Login || POST
router.post("/login", loginController);

//Register || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//ApplyDoctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification|| POST
router.post(
  "/get-all-notifications",
  authMiddleware,
  getAllNotificationsController
);

//Notification Doctor || POST
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationsController
);

//GET All Doctor
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//BOOk APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

module.exports = router;
