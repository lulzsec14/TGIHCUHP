const Student = require("../../models/Student");

exports.checkStudentExists = async(req,res,next) => {
    const {studentId} = req.params;
    try {
        const student = await Student.findById(studentId);
        if(!student){
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