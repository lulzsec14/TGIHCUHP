import { useQuery } from "react-query";
import axios from "axios";

const getStudentFeedbackDetails = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get(`http://localhost:8000/instructor/getStudentFeedbacks/${courseId}`,options)
}
/* ${courseId} */

export const useGetStudentFeedbackDetails = (courseId,handleSuccess,handleError) => {
    return useQuery("get-student-feedback",() =>getStudentFeedbackDetails(courseId),{
        onSuccess:handleSuccess,
        onError:handleError
    })
}