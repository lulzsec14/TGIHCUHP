import axios from "axios";
import {useQuery} from "react-query";

const getAllAdmins = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/admin/getAdmins",options)
}

export const useGetAllAdmins = (handleSuccess,handleError) => {
    return useQuery("get-all-admins",getAllAdmins,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}
