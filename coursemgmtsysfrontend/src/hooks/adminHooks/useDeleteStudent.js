import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const deleteStudent = (studentId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.delete(`http://localhost:8000/admin/deleteStudent/${studentId}`,options)
}

export const useDeleteStudent = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(deleteStudent,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-all-students");
        },
        onError:handleError
    })
}