const Instructor = require("../../models/Instructor");

exports.checkInstructorExists = async(req,res,next) => {
    const {instructorId} = req.params;
    try {
        const instructor = await Instructor.findById(instructorId);

        if(!instructor){
            return res.status(400).json({
                status:"fail",
                message:`Invalid account!`
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"fail",
            message:error
        })
    }
    next();
}