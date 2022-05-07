import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const enrollCourse = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    const courseIdObj = {
        courseId
    }
    return axios.patch(`http://localhost:8000/student/enroll/${courseId}`,courseIdObj,options)
}

export const useEnrollCourse = () => {
    const queryClient = useQueryClient();
    return useMutation(enrollCourse,{
        onSuccess:() => {
            queryClient.invalidateQueries('get-all-courses')
            queryClient.invalidateQueries('get-enrolled-courses')
        }
    })
}