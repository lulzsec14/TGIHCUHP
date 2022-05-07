import { useQuery } from "react-query";
import axios from "axios";

const getQuotes = () => {
    const options = {
        headers: { 
            "Content-Type": "application/json" ,
            "Access-Control-Allow-Origin":"*"
        },
        withCredentials: true,
    };
    return axios.get("https://zenquotes.io/api/quotes",options)
}


export const useGetQuotes = (handleSuccess,handleError) => {
    return useQuery("get-quotes",getQuotes,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}