const CourseFeedback = require("../../models/CourseFeedback")

exports.checkCourseFeedbackGiven = async(req,res,next) => {
    try {
        const {instructorId} = req.body;
        const {studentId} = req.params;
        const isFeedbackGiven = await CourseFeedback.findOne({$and:[{studentId:studentId},{instructorId:instructorId}]});
        console.log(isFeedbackGiven);
        if(isFeedbackGiven){
            return res.status(400).json({
                status:"fail",
                message:"Feedback can be given only once!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:"fail",
            message:error
        })
    }
    next();
}