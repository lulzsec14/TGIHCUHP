import axios from "axios";
import {useQuery} from "react-query";

const getAllCourses = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/admin/getCourses",options)
}

export const useGetAllCourses = (handleSuccess,handleError) => {
    return useQuery("get-all-courses",getAllCourses,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}
