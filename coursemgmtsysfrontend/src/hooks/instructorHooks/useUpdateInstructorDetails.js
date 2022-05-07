import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const udpateInstructorDetails = (studentDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/instructor/updateDetails`,studentDetails,options)
}

export const useUpdateInstructorDetails = (handleSuccess,handleError) => {
    //const queryClient = useQueryClient();
    return useMutation(udpateInstructorDetails,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}