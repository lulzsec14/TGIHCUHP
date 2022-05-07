const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
    FeedbackTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    FeedbackBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    }
})

const Feedback = mongoose.model("Feedback",feedbackSchema);
module.exports = Feedback;