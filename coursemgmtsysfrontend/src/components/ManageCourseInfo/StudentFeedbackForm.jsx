import React,{useState} from 'react';
import { Loader } from 'rsuite';
import { useGetStudentFeedback } from '../../hooks/instructorHooks/useGetStudentFeedback';
import { useGiveStudentFeedback } from '../../hooks/instructorHooks/useGiveStudentFeedback';
import SendIcon from '@rsuite/icons/Send';
import WarningRoundIcon from '@rsuite/icons/WarningRound';

const StudentFeedbackForm = ({student,courseId}) => {
    const [feedback,setFeedback] = useState();
    const [feedbackMessage,setFeedbackMessage] = useState("");
    
    const handleGetStudentFeedbackSuccess = (data) => {
        console.log(data?.data?.data?.feedback);
        setFeedback(data?.data?.data?.feedback)
    }
    const handleGetStudentFeedbackError = error => {
        console.log(error?.response);
    }

    const handleStudentFeedbackSubmit = e => {
        e.preventDefault();
        const feedbackObj = {
            courseId:courseId,
            feedback:{
                studentId:student?._id,
                feedbackMessage:feedbackMessage
            }
        }
        //giveFeedback(feedbackObj);
    }
    const handleGiveFeedbackError = error => {
        console.log(error?.response);
    }

    const handleFeedbackDelete  = e => {
        e.preventDefault();

    }

    const {data,isLoading,isFetching} = useGetStudentFeedback({courseId,studentId:student?._id},handleGetStudentFeedbackSuccess,handleGetStudentFeedbackError);
    const {mutate:giveFeedback,isLoading:giveFeedbackLoading} = useGiveStudentFeedback(handleGiveFeedbackError)

    if(isLoading || isFetching || giveFeedbackLoading){
        return <div><Loader size="md" /></div>
    }

    return (
        <>
           {feedback ?
            <form onSubmit={handleFeedbackDelete}>
                <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder={feedback?.feedbackMessage} className='w-full shadow-md rounded-md border-0 bg-gray-100' disabled maxLength={700} minLength={20}></textarea>
                <button type="submit" className="bg-red-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
                    <span><WarningRoundIcon /></span> Delete Feedback
                </button>
            </form> : 
            <form onSubmit={handleStudentFeedbackSubmit}>
                {/* {console.log(student?._id)} */}
                <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder='Max 700 characters...' className='w-full shadow-md rounded-md border-0' required maxLength={700} minLength={20} onChange={(e) =>setFeedbackMessage(e.target.value) } ></textarea>
                <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
                        Send Feedback <span><SendIcon /></span>
                    </button>
                </div>
            </form>}
        </>
    )
}

export default StudentFeedbackForm