import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Loader } from 'rsuite';
import Sidebar from '../Sidebar/Sidebar';
import instructorImg from "../../images/undraw_instant_information_re_c5v5.svg"
import { useGetInstructorDetails } from '../../hooks/instructorHooks/useGetInstructorDetails';
import { getFeedbackDate } from '../../utils/getFeedbackDate';
import { date } from 'yup/lib/locale';

const InstructorDashboard = () => {
    const [user,setUser] = useState(null);
    const [feedbacks,setFeedbacks] = useState(null);
    const [showCourses,setShowCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        const userRole = Cookies.get("roleType");
        //console.log(userRole);
        console.log(userDetailsCookie)
        if(!userDetailsCookie){
            //navigate("/");
            console.log("here");
        }
    }, [navigate])

    const handleSuccess = (data) => {
        //console.log(data?.data?.user)
        //console.log(data?.data?.data?.feedbacks);
        setUser(data?.data?.data?.user);
        //console.log(data?.data?.data?.user);
        const coursesToShow = data?.data?.data?.user?.coursesAssigned;
        setShowCourses(coursesToShow)
        //console.log(data?.data?.data?.user);
        setFeedbacks(data?.data?.data?.feedbacks);
        //console.log(data?.data?.data);
    }

    const {data,isLoading,isError,error} = useGetInstructorDetails(handleSuccess);

    if(isLoading){
        return <div><Loader size="md" /></div>
    } 
    return (
        <>
        <div className="grid grid-cols-6 font-lato">
            <Sidebar active="dashboard" />
            
            <div className="col-span-5">
            <div className="grid grid-cols-6 mt-10 gap-y-10">
                
                <div className="col-span-6 mx-20 rounded-md border-2 shadow-lg">
                    <div className="flex flex-row">
                        <div className ="basis-2/3">
                            <h1 className="text-5xl font-semibold p-4">Hello {user?.instructorName},</h1>
                            <p className="text-xl font-semibold p-4">Have a good time</p>
                        </div>
                        <div className="basis-1/3">
                            <img src={instructorImg} alt="student" className="p-4" />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 mx-20">
                    {/* chang justify-between to custom space */}
                    <div className="flex flex-row justify-between gap-16">
                        <div className="basis-2/4">
                            <h3 className="text-3xl font-semibold">Currently Teaching</h3>
                                <div>
                                <ul>
                                {showCourses?.length===0 ? <div>No courses to show</div> :
                            showCourses?.reduce((result,course,i) => { 
                                if(i<2){
                                    result.push(
                                        <a href={`/instructor/manageCourses/${course?._id}`} key={course?._id} className="hover:no-underline text-black">
                                            <li key={course?._id}>
                                                <div className="flex flex-row">
                                                    <div className="w-full rounded-md border-2 mb-5 mt-3 p-2">
                                                        <h4 className="text-xl font-bold">{course?.courseTitle}</h4>
                                                        <p>{course?.courseDescription}</p>
                                                        <p><span className="font-bold">Course Duration -</span> {course?.courseDuration}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </a>
                                    )}
                                    return result
                                },[])}
                                </ul>
                            </div>
                            {/* is more than 2 */}
                            {user?.coursesAssigned?.length>2 ? <p className="text-right"><a href="/instructor/manageCourses">View All</a></p> : <div></div>}
                        </div>
                        <div className="basis-2/4">
                        <h3 className="text-3xl font-semibold">Feedbacks Recieved</h3>
                        {/* <p>right side number of feedbacks icon</p> */}

                            {feedbacks?.length===0 ? <div>No feedbacks to show</div> : feedbacks?.map( feedback => (
                                <div key={feedback._id}>
                                <ul>
                                    <li>
                                        <div className="flex flex-row">
                                            <div className="w-full rounded-md border-2 mb-5 mt-3 p-2">
                                                <h4 className="text-xl font-bold">{feedback?.courseId?.courseTitle} / {feedback?.studentId?.studentName}</h4>
                                                <p>{feedback?.feedbackMessage}</p>
                                                <p className='text-sm text-indigo-600'>{new Date(feedback?.feedBackDate).toDateString()}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            ))}
                            {feedbacks?.length===0 ? <div></div>:<p className="text-right"><a href="/feedbacks">View All</a></p>}
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </div>
    </>
    )
}

export default InstructorDashboard

/* 
showCourses?.reduce((result,course,i) => { 
    if(i<2){
        result.push(
            <a href={`/courses/${course?._id}`} key={course?._id} className="hover:no-underline text-black">
                <li key={course._id}>
                    <div className="flex flex-row">
                        <div className="w-full rounded-md border-2 mb-5 mt-3 p-2">
                            <h4 className="text-xl font-bold">{course.courseTitle}</h4>
                            <p>{course?.courseDescription}</p>
                            <p><span className="font-bold">Course Duration -</span> {course.courseDuration}</p>
                        </div>
                    </div>
                </li>
            </a>
        )}
    return result
},[])

*/

/* 
const [user,setUser] = useState(null);
    const [feedbacks,setFeedbacks] = useState(null);
    const [showCourses,setShowCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleSuccess = (data) => {
        //console.log(data?.data?.data?.feedbacks);
        setUser(data?.data?.data?.user);
        console.log(data?.data?.data?.user);
        const coursesToShow = data?.data?.data?.user?.enrolledInCourses;
        //setShowCourses(coursesToShow.s)
        setFeedbacks(data?.data?.data?.feedbacks);
        console.log(data?.data?.data);
    }

    const {data,isLoading,isError,error} = useGetStudentDetails(handleSuccess);

    if(isLoading){
        return <div><Loader size="md" /></div>
    }    

    return (
    
  )

*/