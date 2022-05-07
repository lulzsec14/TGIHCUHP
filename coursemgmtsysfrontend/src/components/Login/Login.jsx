import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import {globalContext} from "../../context/globalState";
import { Loader } from 'rsuite';
import { useLoginStudent } from '../../hooks/studentHooks/useLoginStudent';
import loginImg from "../../images/undraw_teaching_re_g7e3.svg";
import { useInstructorLogin } from '../../hooks/instructorHooks/useInstructorLogin';
import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [role,setRole] = useState("Student");
    const {saveUserDetails} = useContext(globalContext);
    const {mutate,isLoading} = useLoginStudent();
    const {mutate:instructorLogin,isLoading:instructorLoginLoading} = useInstructorLogin();
    const navigate = useNavigate();

    const setStudentCookie =(data) => {
        //console.log(data?.data?.data?.user?.studentName);
        Cookies.set("userDetailsCookie",data?.data?.data?.user);
        Cookies.set("userLetter",data?.data?.data?.user?.studentName);
        Cookies.set("roleType",data?.data?.data?.user?.role)
        saveUserDetails(data?.data?.data?.user);
        navigate("/dashboard");
    }

    const setInstructorCookie = (data) => {
        //console.log(data);
        Cookies.set("userDetailsCookie",data?.data?.user);
        Cookies.set("userLetter",data?.data?.user?.instructorName);
        Cookies.set("roleType",data?.data?.user?.role)
        saveUserDetails(data?.data?.user);
        navigate("/instructor/dashboard");
    }

    const handleError = (error) => {
        toast.error(error?.response?.data?.message);
        setErrorMessage(error?.response?.data?.message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(role === "Student"){
            //console.log("here")
            const studentDetails= {
            email:email,
            studentPassword:password
            }
            mutate(studentDetails,{
                onSuccess:setStudentCookie,
                onError:handleError
            });
        }
        else if(role === "Instructor") {
            console.log(email,password);
            const instructorDetails= {
            email:email,
            instructorPassword:password
            }
            instructorLogin(instructorDetails,{
                onSuccess:setInstructorCookie,
                onError:handleError
            });
        }
        setEmail("");
        setPassword("");
    }


    if(isLoading || instructorLoginLoading){
        return <div><Loader size="md" /></div>
    }
    return (
        <>
            <div className='grid grid-cols-5 font-lato'>
                <div className='flex flex-row col-span-5'>
                    <h2 className='text-4xl font-bold p-3'>Welcome,</h2>
                </div>
                <div className='flex col-span-2 px-3'>
                    <img src={loginImg} alt="login" />
                </div>
                <div className='flex col-span-3 justify-around'>
                    <div className='flex flex-col basis-2/3 shadow-lg'>
                        <h3 className='text-3xl font-bold p-2'>Login</h3>
                        <form onSubmit={handleSubmit} >
                            <div className='flex flex-col px-10 py-5'>
                                <label htmlFor="emailInput">Email Address</label>
                                <input 
                                    type="text" name="emailInput" placeholder="name@mail.com" 
                                    value={email}
                                    className="text-sm text-gray-base w-full 
                                            border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setEmail(e.target.value)}/>
                            </div>

                            <div className='flex flex-col px-10 py-5'>
                                <label htmlFor="passwordInput">Password</label>
                                <input 
                                    type="password" name="passwordInput" placeholder="password"
                                    value={password}
                                    className="text-sm text-gray-base  w-full 
                                             border border-gray-200 
                                            rounded mb-2" 
                                    onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <div className='flex flex-col px-10'>
                                <label htmlFor="selectRoleType">Sign In As</label>
                                <select className="form-select form-select-sm mb-3
                                    w-full
                                    px-4
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:outline-none"
                                    value={role}
                                    onChange = {e => setRole(e.target.value)}
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Instructor">Instructor</option>
                                    </select>
                            </div>

                            {/* {errorMessage && <div className='flex flex-row justify-around px-3 py-1'>
                              <div className='bg-red-300 border-2'>
                                <h4 className='text-normal font-bold text-red-700'>{errorMessage}</h4>
                              </div>
                            </div>} */}

                            <div className='flex flex-col px-10'>
                            <button type="submit" className="bg-indigo-600 w-full mt-4 text-white h-10">
                                Login
                            </button>
                            </div>
                        </form>
                        <div className="flex flex-row justify-around py-2">
                            <span className='text-md mt-5'>Don't have an account? <a href="/signup" className='text-indigo-600'>Create here</a></span>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Login