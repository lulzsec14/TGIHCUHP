import axios from "axios";
import {useQuery} from "react-query";

const getAllStudents = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/admin/getStudents",options)
}

export const useGetAllStudents = (handleSuccess,handleError) => {
    return useQuery("get-all-students",getAllStudents,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}
