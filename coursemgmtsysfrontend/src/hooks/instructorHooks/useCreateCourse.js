import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const createCourse = (courseDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post(`http://localhost:8000/instructor/createCourse`,courseDetails,options)
}

export const useCreateCourse = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(createCourse,{
        onSuccess:() => {
            toast.success("Course created successfully!")
            queryClient.invalidateQueries('get-assigned-courses')
        },
        onError:handleError
    })
}