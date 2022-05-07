import { useQuery } from "react-query";
import axios from "axios";

const getCourseFeedbackDetails = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get(`http://localhost:8000/student/getCourseFeedbacks/${courseId}`,options)
}
/* ${courseId} */

export const useGetCourseFeedbackDetails = (courseId,handleSuccess,handleError) => {
    return useQuery("get-course-feedback",() =>getCourseFeedbackDetails(courseId),{
        onSuccess:handleSuccess,
        onError:handleError
    })
}