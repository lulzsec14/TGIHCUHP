import React, { useEffect, useState } from 'react'
import { useGetCourseDetails } from '../../hooks/coursesHooks/useGetCourseDetails'
import Sidebar from '../Sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader, Panel } from 'rsuite';
import Cookies from "js-cookie";
import SendIcon from '@rsuite/icons/Send';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { useGiveCourseFeedback } from '../../hooks/studentHooks/useGiveCourseFeedback'
import { useGetCourseFeedbackDetails } from '../../hooks/studentHooks/useGetCourseFeedbackDetails'
import { useDeleteCourseFeedback } from '../../hooks/studentHooks/useDeleteCourseFeedback'

const CourseDetails = () => {
    const [courseDetails,setCourseDetails] = useState()
    const [instructorLetter,setInstructorLetter] = useState("");
    const [courseFeedback,setCourseFeedback] = useState("");
    const [instructorId,setInstructorId] = useState("");
    const [feedbackDetails,setFeedbackDetails] = useState();
    const {courseId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        //console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const getCourseDetailsSuccess = (data) => {
        setCourseDetails(data?.data?.data?.course);
        setInstructorLetter(data?.data?.data?.course?.instructorId?.instructorName?.charAt(0).toUpperCase());
        //setInstructorId(data?.data?.data?.course?.instructorId?._id);
    }
    const getCourseDetailsError = (error) => {
        console.log(error?.response);
    }
    
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        const feedbackObj = {
            courseId:courseId,
            feedback:{
                instructorId:courseDetails?.instructorId?._id,
                feedbackMessage:courseFeedback
            }
        }
        giveFeedback(feedbackObj)
    }

    const handleGiveFeedbackError = error => {
        console.log(error?.response)
    }

    const handleGetCourseFeedbackSuccess = data => {
        //console.log(data?.data?.data?.feedback);
        setFeedbackDetails(data?.data?.data?.feedback);
    }

    const handleGetCourseFeedbackError = error => {
        console.log(error?.response);
    }

    const handleFeedbackDelete = e => {
        e.preventDefault();
        console.log(courseId, instructorId);
        const feedbackObj = {
            courseId:courseId,
            instructorId:courseDetails?.instructorId?._id,
            courseFeedbackId:feedbackDetails?._id

        }
        feedbackDelete(feedbackObj)
    }

    const handleDeleteFeedbackError = error => {
        console.log(error?.response);
    }
    
    const {data,isLoading,isFetching} = useGetCourseDetails(courseId,getCourseDetailsSuccess,getCourseDetailsError);
    const {mutate:giveFeedback,isLoading:giveFeedbackLoading} = useGiveCourseFeedback(handleGiveFeedbackError);
    const {mutate:feedbackDelete,isLoading:deleteFeedbackLoading} = useDeleteCourseFeedback(courseId,handleDeleteFeedbackError);
    const {data:courseFeedbackDetails,isLoading:courseFeedbackLoading,isFetching:courseFeedbackFetching} = useGetCourseFeedbackDetails(courseId,handleGetCourseFeedbackSuccess,handleGetCourseFeedbackError);

    if(isLoading || isFetching || giveFeedbackLoading || courseFeedbackLoading || courseFeedbackFetching){
        return <div><Loader size="md" /></div>
    }
    return (
        <>
            <div className="grid grid-cols-6 font-lato">
                <Sidebar active={"courses"} />
                <div className="col-span-5">
                    <h3 className='p-3 text-4xl font-bold'>{courseDetails?.courseTitle}</h3>
                    <div className="grid grid-cols-6 mt-10 gap-y-10">
                        
                        <div className="col-span-6 ">
                            <div className='flex flex-row justify-end mx-36'>
                                <button className='bg-red-600 text-white py-3 px-6 rounded-md shadow-md'>
                                    Exit Course
                                </button>
                            </div>
                        </div>
                        <div className="col-span-6 ">
                            <div className='flex flex-row justify-around mx-36'>
                                <h3 className='text-3xl font-bold'>Course Description</h3>
                            </div>
                            
                            <div className="col-span-3">
                                <div className='flex flex-row w-full justify-around py-3 px-10 gap-5'>
                                    <div className=' basis-1/2 min-h-full'>
                                        <Panel bordered header="Course Details" shaded className='min-h-full'>
                                            <div className='font-semibold p-2'>Course Code - <span>{courseDetails?.courseCode}</span></div> 
                                            <div className='font-semibold p-2'>Course level - <span>{courseDetails?.courseLevel}</span></div>
                                            <div className='font-semibold p-2'>Course Credits - <span>{courseDetails?.credits}</span></div>
                                            <div className='font-semibold p-2'>Enrolled Candidates - <span>{courseDetails?.enrolledCandidates}</span></div> 
                                            <div className='font-semibold p-2'>Course Description - <span>{courseDetails?.courseDescription}</span></div>
                                        </Panel>
                                    </div>
                                    <div className=' basis-1/2 min-h-full'>
                                        <Panel bordered header="Instructor Details" shaded className='min-h-full'>
                                            <div className='flex flex-row'>
                                                <div className='basis-1/2'>
                                                    <div className='font-semibold p-2'>Instructor Name - <span>{courseDetails?.instructorId?.instructorName}</span></div> 
                                                    <div className='font-semibold p-2'>Instructor Email - <span>{courseDetails?.instructorId?.email}</span></div>
                                                    <div className='font-semibold p-2'>Instructor Contact - <span>{courseDetails?.instructorId?.instructorContact}</span></div>
                                                </div>
                                                <div className='flex flex-row '>
                                                    <div className='basis-1/2 '>
                                                        <div className = "bg-indigo-400 rounded-full w-32 h-32 border-2 flex items-center justify-center shadow-lg">
                                                        <p className='text-3xl font-bold'>{instructorLetter}</p> {/* place it in center  */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mt-10 ml-10'>
                                <h3 className='text-3xl font-bold'>Give Feedback</h3>
                                <div className='flex flex-row'>
                                <div className='basis-2/4'>
                                    {feedbackDetails ? 
                                    <form onSubmit={handleFeedbackDelete}>
                                        <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder={feedbackDetails?.feedbackMessage} className='w-full shadow-md rounded-md border-0 bg-gray-100' disabled maxLength={700} minLength={20}></textarea>
                                        <button type="submit" className="bg-red-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
                                            <span><WarningRoundIcon /></span> Delete Feedback
                                        </button>
                                    </form> : 
                                    <form onSubmit={handleFeedbackSubmit}>
                                        <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder='Max 700 characters...' className='w-full shadow-md rounded-md border-0' onChange={e => setCourseFeedback(e.target.value)} required maxLength={700} minLength={20}></textarea>
                                        <button type="submit" className="bg-indigo-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
                                            Send Feedback <span><SendIcon /></span>
                                        </button>
                                    </form>}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetails

/* 
<h3 className='text-3xl font-bold'>Give Feedback</h3>
    <div className='basis-2/4'>
        <form onSubmit={handleFeedbackSubmit}>
            <label htmlFor="giveFeedback">Enter Feedback</label>
            <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder='Max 700 characters...' className=''></textarea>
        </form>
    </div>

*/



/* <h1 className="text-2xl font-semibold p-4">Course Material Name</h1>
    <div className='flex flex-row'>
    <div className="basis-2/3 w-full"><p className='text-xl font-semibold p-4'>Last Updated On - Date Here</p></div>
    <div className="basis-1/3 justify-end"><button className='bg-indigo-600 text-white py-4 px-6 rounded-md'>
        View
    </button>
</div>
</div> */