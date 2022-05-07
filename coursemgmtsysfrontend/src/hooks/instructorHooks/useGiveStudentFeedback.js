import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const giveStudentFeedback = (feedbackObj) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post(`http://localhost:8000/instructor/giveFeedback/${feedbackObj?.courseId}`,feedbackObj?.feedback,options)
}

export const useGiveStudentFeedback = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(giveStudentFeedback,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-course-feedback")
        },
        onError:handleError
    })
}