import { useQuery,useQueryClient } from "react-query";
import axios from "axios";

const getStudent = (studentId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get(`http://localhost:8000/admin/getStudent/${studentId}`,options)
}

export const useGetStudent = (studentId,handleSuccess,handleError) => {
    //const queryClient = useQueryClient();
    return useQuery("get-student-details-id",() =>getStudent(studentId),{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}