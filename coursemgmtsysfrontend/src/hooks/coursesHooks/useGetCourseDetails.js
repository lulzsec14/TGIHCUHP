import axios from "axios";
import {useQuery} from "react-query";

const getCourseDetails = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get(`http://localhost:8000/course/${courseId}`,options)
}

export const useGetCourseDetails = (courseId, handleSuccess,handleError) => {
    return useQuery("get-course-details",() => getCourseDetails(courseId),{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}