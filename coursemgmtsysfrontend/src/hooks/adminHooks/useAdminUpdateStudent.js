import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const adminUpdateStudent = (updateStudent) => {
    console.log(updateStudent)
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/admin/updateStudent/${updateStudent?.id}`,updateStudent?.details,options)
}

export const useAdminUpdateStudent = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(adminUpdateStudent,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-all-students");
        },
        onError:handleError
    })
}