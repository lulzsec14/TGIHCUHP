import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
const LogOut = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.delete("http://localhost:8000/student/logout",options);
}

export const useLogOut = () => {
    return useMutation(LogOut)
}