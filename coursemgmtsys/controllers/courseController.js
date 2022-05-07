const Course = require("../models/Course");

exports.getCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const resCourse = await Course.findById(courseId).populate(["instructorId","enrolledStudents"]);
        return res.status(200).json({
            status:"success",
            data:{
                course:resCourse
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getAllCourses = async(req,res) => {
    try {
        const allCourses = await Course.find().populate(["enrolledStudents","instructorId"]);
        res.status(200).json({
            status:"success",
            data:{
                length:allCourses.length,
                courses:allCourses
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}