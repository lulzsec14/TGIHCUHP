import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
const createAdmin = (adminDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/admin/createAdmin",adminDetails,options)
}
export const useCreateAdmin = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(createAdmin,{
        onSuccess:() => {
            toast.success("Admin created successfully!")
            queryClient.invalidateQueries("get-all-admins")
        },
        onError:handleError
    })
}