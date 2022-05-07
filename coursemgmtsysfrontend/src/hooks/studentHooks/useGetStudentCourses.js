import { useQuery } from "react-query";
import axios from "axios";

const getAllCourses = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/course/allCourses",options)
}


export const useGetAllCourses = (handleSuccess,handleError) => {
    return useQuery("get-all-courses",getAllCourses,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}