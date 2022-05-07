const Instructor = require("../models/Instructor");
const Course = require("../models/Course")
const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");
const Student = require("../models/Student");
const CourseMaterial = require("../models/CourseMaterial");
const CourseFeedback = require("../models/CourseFeedback");

const filterObject = (obj,...allowedFields) => {
    let newObject = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObject[el] = obj[el] //add desired fields to new obj
        }
    })
    return newObject;
}

exports.checkInstructorExists = async(req,res,next) => {
    try {
        const {id} = req.params;
        const instructor = await Instructor.findById(id);
        if(!instructor){
            throw new Error();
        }
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:"Instructor does not exist!"
        })
    }
    next();
}

exports.createCourse = async (req,res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {instructor} = req;
        const createCourseReq = {
            ...req.body,
            instructorId:instructor._id
        }
        const newCourse = await Course.create(createCourseReq);
        await instructor.updateOne({$push:{coursesAssigned:newCourse._id}}).session(session);
        //console.log(instructor);
        await session.commitTransaction();
        return res.status(201).json({
            status:"success",
            data:{
                course:newCourse
            }
        })
    } catch (error) {
        session.abortTransaction();
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getInstructorDetails = async(req,res) => {
    try {
        const {instructor} = req;
        const resInstructor = await Instructor.findById(instructor._id).populate(["feedBacksGiven","coursesAssigned"]); 
        const resFeedbacks = await CourseFeedback.find({instructorId:instructor._id}).populate(["studentId","courseId","instructorId"]);
        return res.status(200).json({
            status:"success",
            data:{
                user:resInstructor,
                feedbacks:resFeedbacks
            }
        })
    } catch (error) {
        console.log
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getAllInstructors = async(req,res) => {
    try {
        const allInstructors = await Instructor.find();
        res.status(200).json({
            status:"success",
            data:{
                admins:allInstructors
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getInstructorCourses = async(req,res) => {
    try {
        const {instructor} = req;
        const courses = await Course.find({instructorId:instructor._id}).populate(["enrolledStudents","courseFeedbacks","studentFeedbacks"])
        //console.log(courses);
        res.status(200).json({
            status:"success",
            data:{
                length:courses.length,
                courses:courses
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

/* allowed to admin only?? */
exports.updateDetails = async(req,res) => {
    //console.log(req.file);
    console.log(req.body);
    //error if password updation tried
    //else update user document
    if(req.body.currentPassword || req.body.passwordConfirm){
        return res.status(400).json({ //400 -> bad request
            status:"fail",
            message:"Please use /updateDetails/password for password updates!"
        })
    }
    try {
        //can't use user.save() as some fields are required which throws err
        //using findByIdAndUpdate() here
        const filteredBody = filterObject(req.body,'instructorAddress','instructorContact');
        const updatedInstructor = await Student.findByIdAndUpdate(req.instructor._id,filteredBody,{new:true,runValidators:true});
        return res.status(200).json({
            status:"success",
            data:{
                updatedInstructor
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error
        })
    }
}

exports.updatedCourseDescription = async(req,res,next) => {
    try {
        const {courseId} = req.params;
        const {courseDescription} = req.body;
        const filteredObj = filterObject(courseDescription,'courseDescription');
        //console.log(courseId, courseDescription);
        const resCourse = await Course.findByIdAndUpdate(courseId,filteredObj,{new:true,runValidators:true});
        return res.status(200).json({
            status:"success",
            resCourse
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            status:"fail"
        })
    }
}

exports.updatePassword = async(req,res,next) => {
    try {
        const {currentPassword,newPassword,newPasswordConfirm} = req.body;
        const instructor = await Instructor.findById(req.instructor._id).select('+instructorPassword');
        if(!await instructor.correctPassword(currentPassword,instructor.instructorPassword)){
            return res.status(401).json({
                status:"fail",
                message:"Current Password is incorrect!"
            })
        }
        instructor.instructorPassword = newPassword;
        instructor.passwordConfirm = newPasswordConfirm;
        await instructor.save(); //runs validation again
        const token = signToken(instructor._id);
        return res.status(200).json({
            status:"success",
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"fail",
            message:error
        })
    }
}

//need to delete id from course too
//impl transaction delete
//create with role restriction to admin
exports.deleteInstructor = async(req,res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {id} = req.params;
        const courses = await Course.find({instructorId:id}).updateMany({instructorId:null});
        const updatedCourses = await Course.find();
        console.log(updatedCourses);
        //await Instructor.findByIdAndDelete(id).session(session);
        res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

//need to delete course from instructor too
//impl transaction delete
//create with role restriction to admin
exports.deleteCourse = async(req,res) => {
    try {
        const {courseId} = req.params;
        await Course.findByIdAndDelete(courseId);
         res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.giveFeedback = async(req,res,next) =>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {courseId} = req.params;
        const {instructor} = req;
        //console.log(req.body);
        const {feedbackMessage,studentId} = req.body;
        const course = await Course.find({$and:[{_id:courseId},{enrolledStudents:{$elemMatch:{$eq:studentId}}},{instructorId:instructor._id}]});
        //console.log(course);
        
        //console.log(course[0]._id);
        //console.log(course);
        if(course.length===0){
            return res.status(404).json({
                status:'fail',
                message:"Student / Instructor doesn't exist!"
            })
        }

         if(feedbackMessage===""){
            return res.status(400).json({
                status:"fail",
                message:"Please enter a valid feedback!"
            })
        }

        const feedbackObj ={
            feedbackMessage:feedbackMessage,
            feedBackDate:Date.now(),
            courseId:course[0]._id,
            FeedbackTo:studentId,
            FeedbackBy:instructor._id
        } 
        const newFeedback = await Feedback.create(feedbackObj);
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{studentFeedbacks:newFeedback._id}},{new:true}).session(session);
        const updatedStudent = await Student.findByIdAndUpdate(studentId,{$push:{feedBacksRecieved:newFeedback._id}},{new:true}).session(session);

        //console.log(newFeedback);

        const updatedInstructor = await Instructor.findByIdAndUpdate(instructor._id,{$push:{feedBacksGiven:newFeedback._id}},{new:true}).session(session);
        session.commitTransaction();
        return res.status(200).json({
            status:"success",
            data:{
                newFeedback
            }
        })

    } catch (error) {
        session.abortTransaction();
        console.log(error);
        return res.status(404).json({
            message:error
        })
    }
}

exports.getStudentFeedbackDetails = async(req,res,next) => {
    const {instructor} = req;
    const {courseId,studentId} = req.params;
    try {
        const resFeedback = await Feedback.findOne({$and:[{FeedbackBy:instructor._id},{courseId:courseId},{FeedbackTo:studentId}]}).populate(["courseId","FeedbackBy","FeedbackTo"])
        console.log(resFeedback);
        return res.status(200).json({
            status:"success",
            data:{
                feedback:resFeedback
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status:"error",
            message:error
        })
    }
}

/* @TODOS 
    -> COMPLETE MANAGE COURSE INFO INSTR
    -> IMPL MULTER COURSE MATERIAL FEATURE
    -> FIX FEEDBACK DATE ISSUES
*/

exports.deleteFeedback = async(req,res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {instructor} = req;
        const {courseId,studentId,studentFeedbackId} = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(studentId,{$pull:{feedBacksRecieved:studentFeedbackId}},{new:true}).session(session);
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$pull:{studentFeedbacks:studentFeedbackId}},{new:true}).session(session);
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructor._id,{$pull:{feedBacksGiven:studentFeedbackId}},{new:true}).session(session);
        await Feedback.findByIdAndDelete(studentFeedbackId).session(session);
        session.commitTransaction();
        return res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        session.abortTransaction();
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.addCourseMaterial = async(req,res) => {
    const session = await mongoose.startSession();
    try {
        const {instructor} = req;
        const {courseMaterialTitle,courseMaterialLink,courseId} = req.body;
        const courseMaterial = {
            courseMaterialTitle,
            courseMaterialLink,
            createdAt:Date.now(),
            instructorId:instructor._id,
            courseId
        }
        const newCourseMaterial =  await CourseMaterial.create(courseMaterial);
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseMaterial:newCourseMaterial._id}},{new:true}).session(session);
        res.staus(201).json({
            status:"success",
            data:{
                updatedCourse
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}