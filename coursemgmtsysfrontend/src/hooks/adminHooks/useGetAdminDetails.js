import axios from "axios";
import {useQuery} from "react-query";

const getAdminDetails = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/admin/getAdmin",options)
}

export const useGetAdminDetails = (handleSuccess,handleError) => {
    return useQuery("get-admin-details",getAdminDetails,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}