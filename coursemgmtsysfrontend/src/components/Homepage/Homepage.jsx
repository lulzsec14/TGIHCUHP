import React, { useEffect,useContext, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import studentImg from "../../images/undraw_coding_re_iv62.svg";
import { useGetStudentDetails } from '../../hooks/studentHooks/useGetStudentDetails';
import { Loader } from 'rsuite';
import { useGetQuotes } from '../../hooks/quoteHooks/useGetQuotes';
import {getFeedbackDate} from "../../utils/getFeedbackDate";


const Homepage = () => {
    const [user,setUser] = useState(null);
    const [feedbacks,setFeedbacks] = useState(null);
    const [feedbackDate,setFeedbackDate] = useState("");
    const [showCourses,setShowCourses] = useState([]);
    const navigate = useNavigate();
    var date = new Date();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        //console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleSuccess = (data) => {
        setUser(data?.data?.data?.user);
        //console.log(data?.data?.data?.user);
        const coursesToShow = data?.data?.data?.user?.enrolledInCourses;
        setShowCourses(coursesToShow)
        setFeedbacks(data?.data?.data?.feedbacks);
        //console.log(data?.data?.data?.feedbacks);
        //console.log(data?.data?.data);
    }

    const handleError = error => {
        console.log(error?.response);
    }

    const handleGetQuotesSuccess = data => {
        console.log(data);
    }

    const handleGetQuotesError = error => {
        console.log(error?.response);
    }

    const {data,isLoading,isError,error} = useGetStudentDetails(handleSuccess,handleError);
    //const {data:quotes,isLoading:getQuotesLoading,isError:getQuotesError,error:quotesError} = useGetQuotes(handleGetQuotesSuccess,handleGetQuotesError);

    if(isLoading ){
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
                            <h1 className="text-5xl font-semibold p-4">Hello {user?.studentName},</h1>
                            <p className="text-xl font-semibold p-4">Have a good study</p>
                        </div>
                        <div className="basis-1/3">
                            <img src={studentImg} alt="student" className="p-4" />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 mx-20">
                    {/* chang justify-between to custom space */}
                    <div className="flex flex-row justify-between gap-16">
                        <div className="basis-2/4">
                            <h3 className="text-3xl font-semibold">Currently Enrolled In</h3>
                            {/* <p>right side number of courses icon</p> */}
                                {/* add course limit list to 2 and courseDescription */}
                                <div>
                                <ul>
                                {showCourses?.length===0 ? <div>No courses to show</div> :
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
                                  },[])}
                                </ul>
                            </div>
                            {/* is more than 2 */}
                            {showCourses?.length>2 ? <p className="text-right"><a href="/courses">View All</a></p> : <div></div>}
                        </div>
                        <div className="basis-2/4">
                        <h3 className="text-3xl font-semibold">Feedbacks Recieved</h3>
                        {/* <p>right side number of feedbacks icon</p> */}

                            {feedbacks?.length===0 ? <div>No feedbacks to show</div> : feedbacks?.map( feedback => (
                                <div key={feedback?._id}>
                                <ul>
                                    <li>
                                        <div className="flex flex-row">
                                            <div className="w-full rounded-md border-2 mb-5 mt-3 p-2">
                                                <h4 className="text-xl font-bold">{feedback?.courseId?.courseTitle} / {feedback?.FeedbackBy?.instructorName}</h4>
                                                <p>{feedback?.feedbackMessage}</p>
                                                <p className='text-sm text-indigo-600'>{new Date(feedback?.feedBackDate).toDateString()}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {/* if more than 2 */}
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

export default Homepage