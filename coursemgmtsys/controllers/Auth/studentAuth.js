const Student = require("../../models/Student");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const Feedback = require("../../models/Feedback");
require("dotenv")

const signToken = id => {
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}

/* student signup */
exports.signup = async(req,res,next) => {
    try {
        const newStudent = await Student.create(req.body);
        /* const {studentAge,studentAddress,studentGender} = req.body; role restrictions ?? */
        const token = signToken(newStudent._id)
        return res.status(201).json({
            status:"success",
           // token:token,
            data:{
                student:newStudent
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({
            status:"fail",
            message:error
        })        
    }
}

exports.login = async(req,res,next) => {
    const {email,studentPassword} = req.body;
    if(!email || !studentPassword){
        return res.status(400).json({
            status:"fail",
            message:"Please provide a valid email / password!"
        })
    }

    const student = await Student.findOne({email:email}).select('+studentPassword');

    if(!student || !await student.correctPassword(studentPassword,student.studentPassword)){
        return res.status(401).json({ //401 -> unauthorised
            status:"fail",
            message:"Invalid email / password"
        })
    }

    const token = signToken(student._id);
    const resStudent = await Student.findById(student._id).populate("enrolledInCourses");
    const resFeedback = await Feedback.find({FeedbackTo:student._id}).populate(["courseId","FeedbackTo","FeedbackBy"]);
    //same name overwrites the cookie
    console.log(token)
    res.cookie("jwt",token,{
        maxAge:86400000,
        //secure:true, //will send only on https req
        httpOnly:true, //cookie cannot be modified by browser
        //sameSite:"none"
    });
    
    res.status(200).json({
        status:"success",
        data:{
            user:resStudent,
            feedbacks:resFeedback
        }
    })
}

exports.protect = async(req,res,next) => {
    try {
        let payload;
        let student;
        //console.log("here")
        const token = req.cookies.jwt;
        //console.log("delete Auth " + token);
        //console.log(req);
        //console.log("here");
        if(!token){
            console.log("here goes code")
            return res.status(401).json({ //unauthorised
                status:"fail",
                message:"You are not logged in!"
            })
        }    

        try {
            payload = await promisify(jwt.verify)(token , process.env.JWT_SECRET);
            /* console.log(payload); */
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                status:"fail",
                message:"Invalid / Expired token!"
            })
        }

        try {
            student = await Student.findById(payload.id)
            if(!student){
                throw new Error(); //throw error if user doesn't exists
            }
        } catch (error) {
            return res.status(401).json({
                status:"fail",
                message:"user doesn't exist!"
            })
        }
    
        /* password changes after verification -> model */
        if(student.changedPasswordAfter(payload.iat)){
            return res.status(401).json({
                status:"fail",
                message:"Password was changed recently.Log in again!"
            })
        }
        req.student = student; //storing student to req
        //access to protected route
        next();
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.logout = async(req,res,next) => {
    const token = req.cookies;
    //console.log(token);
    res.clearCookie("jwt",{
        maxAge:86400000,
        httpOnly:true, //cookie cannot be modified by browser
    });
    res.status(200).json({
        status:"success"
    })
}

exports.restrictTo=(...roles) => {
    return (req,res,next) => {
        //roles = ["admin","student"]
        //have access to req.student as protect runs before restrictTo()
        if(!roles.includes(req.student.role)){ 
            return res.status(403).json({ //forbidden
                status:"fail",
                message:"You do not have permission to perform this action!"
            })
        } 
        next();
    }
}