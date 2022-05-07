import axios from "axios";
import {useQuery} from "react-query";

const getInstructorDetails = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/instructor/getInstructor",options)
}

export const useGetInstructorDetails = (handleSuccess,handleError) => {
    return useQuery("get-instructor-details",getInstructorDetails,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}