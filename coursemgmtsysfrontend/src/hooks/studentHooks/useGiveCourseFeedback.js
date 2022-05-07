import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const giveCourseFeedback = (feedbackObj) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post(`http://localhost:8000/student/giveCourseFeedback/${feedbackObj?.courseId}`,feedbackObj?.feedback,options)
}

export const useGiveCourseFeedback = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(giveCourseFeedback,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-course-feedback")
        },
        onError:handleError
    })
}