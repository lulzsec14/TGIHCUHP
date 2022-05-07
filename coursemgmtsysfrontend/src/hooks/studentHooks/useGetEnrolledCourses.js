import { useQuery } from "react-query";
import axios from "axios";

const getEnrolledCourses = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/student/getEnrolledCourses",options)
}


export const useGetEnrolledCourses = (handleSuccess,handleError) => {
    return useQuery("get-enrolled-courses",getEnrolledCourses,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}