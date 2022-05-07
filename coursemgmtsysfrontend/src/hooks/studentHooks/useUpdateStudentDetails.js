import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const updateStudentDetails = (studentDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/student/updateDetails`,studentDetails,options)
}

export const useUpdateStudentDetails = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(updateStudentDetails,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-student-details")
        },
        onError:handleError
    })
}