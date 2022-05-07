import axios from "axios";
import {useQuery} from "react-query";

const getStudentFeedback = (idObj) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get(`http://localhost:8000/instructor/getStudentFeedbacks/${idObj.courseId}/${idObj.studentId}`,options)
}

export const useGetStudentFeedback = (idObj, handleSuccess,handleError) => {
    return useQuery("get-student-feedback",() => getStudentFeedback(idObj),{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}