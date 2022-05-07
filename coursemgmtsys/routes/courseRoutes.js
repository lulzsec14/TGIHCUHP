const express = require("express");
const { getAllCourses,getCourse } = require("../controllers/courseController");
const router = express.Router();
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");

router.get("/allCourses",getAllCourses)
router.get("/:courseId",getCourse);


module.exports = router;