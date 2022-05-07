import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useSignUpStudent } from '../../hooks/studentHooks/useSignUpStudent';
import SignUpimg from '../../images/undraw_access_account_re_8spm.svg';
import * as Yup from "yup";
import { useFormik } from 'formik';

const SignUp = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const {mutate,error,isLoading} = useSignUpStudent();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name:Yup.string().required("Name is required!"),
    email:Yup.string().required("Please provide an email address!").email("Please provide a valid email!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    contact:Yup.string().required("Contact number is required!").min(10,"Contact must be 10 digits!").max(10,'Contact must be 10 digits!'),
    age:Yup.string().required("Age is required!").min(2,"Enter a valid age").max(2,"Enter a valid age!")
  })

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      contact:"",
      age:""
    },validationSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  })

  const handleError = (err) => {
    console.log(err?.response?.data?.messages?.errors);
    setErrorMessage(err.response.data.message);
  }

  const handleSuccess = (data) => {
    navigate("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentDetailsObj = {
      studentName:name,
      email:email,
      studentPassword:password,
      passwordConfirm:confirmPassword,
      studentContact:contact,
      studentAge:age,
    }
    mutate(studentDetailsObj,{
      onSuccess:handleSuccess,
      onError:handleError
    });
  }
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <>
            <div className='grid grid-cols-5 font-lato'>
                <div className='flex flex-row col-span-5'>
                    <h2 className='text-4xl font-bold p-3'>Welcome,</h2>
                </div>
                <div className='flex col-span-1 px-3'>
                    <img src={SignUpimg} alt="signup" />
                </div>
                <div className='flex col-span-3 justify-around'>
                    <div className='flex flex-col basis-2/3 shadow-lg'>
                        <h3 className='text-3xl font-bold p-2'>SignUp</h3>
                        <form onSubmit={handleSubmit}>
                          <div className='flex flex-row justify-between mb-10'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                <input 
                                    type="text" name="name"  
                                    value={name}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setName(e.target.value)} required/>
                                </div>
                                {/* set limit to 10 */}
                                <div className='basis-1/3 pr-2'>
                                    <label htmlFor="contact">Contact</label> <br />
                                    <input 
                                    type="text" name="contact"  
                                    value={contact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setContact(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-10'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="email">Email</label> <br />
                                <input 
                                    type="text" name="email"  
                                    value={email}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setEmail(e.target.value)} required/>
                                </div>
                                <div className='basis-1/3 pr-2'>
                                    <label htmlFor="studentAge">Age</label> <br />
                                    <input 
                                    type="text" name="studentAge" 
                                    value={age} 
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setAge(e.target.value)} required/>
                                </div>
                            </div>


                            <div className='flex flex-row justify-between mb-10 px-4'>
                                <div className='w-full'>
                                <label htmlFor="password">Password</label> <br />
                                <input 
                                    type="password" name="password"  
                                    value={password}
                                    className="text-sm text-gray-base w-full 
                                            py-5 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setPassword(e.target.value)} required minLength={8}/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-10 px-4'>
                                <div className='w-full'>
                                <label htmlFor="passwordConfirm">Confim password</label> <br />
                                <input 
                                    type="password" name="passwordConfirm"
                                    value={confirmPassword}  
                                    className="text-sm text-gray-base w-full 
                                            py-5 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setConfirmPassword(e.target.value)} minLength={8}/>
                                </div>
                            </div>

                            {errorMessage && <div className='flex flex-row px-3 py-1'>
                              <div className='bg-red-300 border-2'>
                                <h4 className='text-normal font-bold text-red-700'>{errorMessage}</h4>
                              </div>
                            </div>}

                            <div className='flex flex-row px-3'>
                              <div className="w-full">
                                <button type="submit" className="bg-indigo-600 mt-4 w-full text-white h-10 rounded-md shadow-md">
                                  Create Account
                                </button>
                              </div>
                            </div>

                        </form>
                        <div className="flex flex-row justify-around py-2">
                            <span className='text-md mt-5'>Have an account? <a href="/" className='text-indigo-600'>Login</a></span>
                        </div>
                    </div>
                </div>
            </div>  
        </>
  )
}
export default SignUp
