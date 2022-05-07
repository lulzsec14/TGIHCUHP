import {useQuery} from "react-query";
import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
const signUpStudent = (student) => {
    return axios.post("http://localhost:8000/student/signUp",student)
}
export const useSignUpStudent = () => {
    return useMutation(signUpStudent)
}