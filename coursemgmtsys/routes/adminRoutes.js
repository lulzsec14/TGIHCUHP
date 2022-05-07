const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const {checkStudentExists} = require("../utilities/Email/checkStudentExists");
const {checkInstructorExists} = require("../utilities/Email/checkInstructorExists");
const {login,signup,protect,restrictTo} = require("../controllers/Auth/adminAuth");
const {getAdminDetails,deleteAdmin,getAllAdmins,createAdmin,deleteStudent,updatePassword,deleteInstructor,updateAdminDetails,getAllStudents, getStudentWithId, getAllCourses , updateStudent} = require("../controllers/adminController");

router.post("/createAdmin",protect,restrictTo("admin"),createAdmin);
router.post("/login",login); //may change

router.get("/getAdmin",protect,restrictTo("admin"),getAdminDetails);
router.get("/getAdmins",protect,restrictTo("admin"),getAllAdmins);
router.get("/getStudents",protect,restrictTo("admin"),getAllStudents);
router.get("/getCourses",protect,restrictTo("admin"),getAllCourses);
router.get("/getStudent/:studentId",protect,restrictTo("admin"),getStudentWithId)

router.delete("/deleteAdmin/:id",protect,restrictTo("admin"),deleteAdmin);
router.delete("/deleteStudent/:studentId",protect,restrictTo("admin"),checkStudentExists,deleteStudent); //impl checkEmailId middle
router.delete("/deleteInstructor/:instructorId",protect,restrictTo("admin"),checkInstructorExists,deleteInstructor); //check controller 
//router.delete("/deleteCourse/:courseId",protect,restrictTo("admin"),checkCourseExists,deleteCourse);

//router.delete("/deleteCourse/:courseId",protect,restrictTo("admin"),deleteCourse);

router.patch("/updateDetails/password",protect,restrictTo("admin"),updatePassword);
router.patch("/updateProfile",protect,restrictTo("admin"),updateAdminDetails)
router.patch("/updateStudent/:studentId",protect,restrictTo("admin"),updateStudent)

module.exports = router;