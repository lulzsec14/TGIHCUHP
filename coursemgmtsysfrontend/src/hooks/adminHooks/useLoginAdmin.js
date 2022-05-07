import { useMutation } from "react-query";
import axios from "axios";

const loginAdmin = (admin) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/admin/login",admin,options)
}


export const useLoginAdmin = () => {
    //const queryClient = useQueryClient();
    return useMutation(loginAdmin)
}