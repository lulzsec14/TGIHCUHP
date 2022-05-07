import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const deleteCourseFeedback = (feedbackObj) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.delete(`http://localhost:8000/student/deleteCourseFeedback/${feedbackObj?.courseId}/${feedbackObj?.instructorId}/${feedbackObj?.courseFeedbackId}`,/* feedbackObj?.idDetails */options)
}

export const useDeleteCourseFeedback = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(deleteCourseFeedback,{
        onSuccess:(data) => {
            queryClient.invalidateQueries("get-course-feedback")
            console.log(data)
        },
        onError:handleError
    })
}