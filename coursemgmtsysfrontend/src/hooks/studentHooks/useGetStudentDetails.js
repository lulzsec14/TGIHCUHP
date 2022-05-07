import axios from "axios";
import {useQuery} from "react-query";

const getStudentDetails = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/student/getStudent",options)
}

export const useGetStudentDetails = (handleSuccess,handleError) => {
    return useQuery("get-student-details",getStudentDetails,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}