const mongoose = require("mongoose");

const courseFeedbackSchema = new mongoose.Schema({
    feedbackMessage:{
        type:String,
        required:[true,"Please provide a valid feedback!"],
        maxlength:600
    },
    feedBackDate:{
        type:Date
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }
})

const CourseFeedback = mongoose.model("CourseFeedback",courseFeedbackSchema);
module.exports = CourseFeedback;