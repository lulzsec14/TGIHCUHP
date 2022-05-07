const express = require("express");
const multer = require("multer")
const router = express.Router();
const {checkId} = require("../utilities/Email/checkEmail")
const {signup, login, logout, protect, restrictTo} = require("../controllers/Auth/studentAuth")
const {getStudent,getAllStudents,enrollInCourse,exitFromCourse,updatePassword,updateDetails,getEnrolledCourses, giveCourseFeedback, deleteCourseFeedback,getCourseFeedbackDetails} = require("../controllers/studentController")
const {deleteStudent} = require("../controllers/adminController");
const { checkCourseFeedbackGiven } = require("../utilities/courseFeedbacks/checkCourseFeedbackGiven");

router.post("/signup",checkId,signup);
router.post("/login",login);
router.post("/giveCourseFeedback/:courseId", protect, restrictTo("student"), checkCourseFeedbackGiven, giveCourseFeedback);

router.get("/allUsers",getAllStudents)
router.get("/getStudent",protect,restrictTo("student"),getStudent)
router.get("/getEnrolledCourses",protect,restrictTo("student"),getEnrolledCourses);
router.get("/getCourseFeedbacks/:courseId",protect,restrictTo("student"),getCourseFeedbackDetails);

router.patch("/enroll/:courseId",protect,restrictTo("student"),enrollInCourse);
router.patch("/unenroll/:courseId",protect,restrictTo("student"),exitFromCourse);


router.patch("/updateDetails",protect,restrictTo("student"),updateDetails);
router.patch("/updateDetails/password",protect,restrictTo("student"), updatePassword);

router.delete("/deleteCourseFeedback/:courseId/:instructorId/:courseFeedbackId",protect,restrictTo("student"),deleteCourseFeedback);
router.delete("/deleteUser",protect,restrictTo("admin"),deleteStudent);
router.delete("/logout",logout);

module.exports = router;