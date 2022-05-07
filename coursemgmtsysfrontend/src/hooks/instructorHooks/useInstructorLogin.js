import { useMutation } from "react-query";
import axios from "axios";

const logininstructor = (instructor) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/instructor/login",instructor,options)
}


export const useInstructorLogin = () => {
    //const queryClient = useQueryClient();
    return useMutation(logininstructor)
}