import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const updateAdminDetails = (adminDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/admin/updateProfile`,adminDetails,options)
}

export const useUpdateAdminDetails = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(updateAdminDetails,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-admin-details");
        },
        onError:handleError
    })
}