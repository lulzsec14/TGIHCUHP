import { useMutation } from "react-query";
import axios from "axios";

const loginStudent = (student) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/student/login",student,options)
}


export const useLoginStudent = () => {
    //const queryClient = useQueryClient();
    return useMutation(loginStudent)
}