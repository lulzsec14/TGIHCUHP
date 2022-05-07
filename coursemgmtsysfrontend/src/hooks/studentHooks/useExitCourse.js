import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const exitCourse = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    const courseIdObj = {
        courseId
    }
    return axios.patch(`http://localhost:8000/student/unenroll/${courseId}`,courseIdObj,options)
}

export const useExitCourse = () => {
    const queryClient = useQueryClient();
    return useMutation(exitCourse,{
        onSuccess:() => {
            queryClient.invalidateQueries('get-all-courses');
            queryClient.invalidateQueries('get-enrolled-courses');
        }
    })
}