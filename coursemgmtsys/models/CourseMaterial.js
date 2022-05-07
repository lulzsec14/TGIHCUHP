const mongoose = require("mongoose");

const courseMaterialSchema = new mongoose.Schema({
    courseMaterialTitle:{
        type:String
    },
    createdAt:{
        type:Date
    },
    courseMaterialLink:{
        type:String
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    }
})

const CourseMaterial = mongoose.model("CourseMaterial",courseMaterialSchema);

module.exports = CourseMaterial;