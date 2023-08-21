const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDocByIdController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

//POST doc info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST update profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST Get single doc info
router.post("/getDocById", authMiddleware, getDocByIdController);

module.exports = router;
