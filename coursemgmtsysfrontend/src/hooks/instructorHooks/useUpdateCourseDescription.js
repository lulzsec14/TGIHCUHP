import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const updateCourseDescription = (courseObj) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.put(`http://localhost:8000/instructor/updateDescription/${courseObj?.courseId}`,courseObj?.courseDescription,options)
}

export const useUpdateCourseDescription = (handleSuccess,handleError) => {
    const queryClient = useQueryClient();
    return useMutation(updateCourseDescription,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}