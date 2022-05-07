import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Cookies from "js-cookie";
import adminImg from "../../images/undraw_new_entries_re_cffr.svg";
import studentImg from "../../images/undraw_coding_re_iv62.svg";
import instructorImg from "../../images/undraw_add_information_j2wg.svg";
import courseImg from "../../images/undraw_environmental_study_re_q4q8.svg";
import { useNavigate } from 'react-router-dom';
import { useGetAdminDetails } from '../../hooks/adminHooks/useGetAdminDetails';
import { Loader } from 'rsuite';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
export const AdminDashboard = () => {
    const [user,setUser] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        //console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleSuccess = (data) => {
        //console.log(data);
        setUser(data?.data?.data?.user);    
    }

    const handleError = (error) => {
        console.log(error?.response);
    }

    const {data:adminDetails,isLoading,isError,error} = useGetAdminDetails(handleSuccess,handleError);

    if(isLoading ){
        return <div><Loader size="md" /></div>
    }    

    return (
        <>
            <div className="grid grid-cols-6 font-lato">
            <Sidebar active="dashboard" />
            
            <div className="col-span-5">
            <div className="grid grid-cols-6 mt-10 gap-y-10">   

                <div className="col-span-6 mx-20 rounded-md border-2 shadow-lg">
                    <div className="flex flex-row">
                        <div className ="basis-2/3">
                            <h1 className="text-5xl font-semibold p-4">Hello {user?.adminName},</h1>
                        </div>
                        <div className="basis-1/3">
                            <img src={adminImg} alt="student" className="p-4" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-around col-span-6 mx-20 gap-3.5">
                    <div className="basis-1/3 rounded-md shadow-md border-2">
                        <div className='flex flex-col w-full h-full p-2 '>
                            <img src={studentImg} alt="student" className='h-3/4' />
                            <div className=' flex flex-row w-full h-full justify-around'>
                                    <div className="basis-2/3">
                                    <a href="/admin/manageStudents">
                                        <button className="bg-indigo-600 text-white w-full py-2 px-2 mt-2 rounded-md shadow-md">Manage Students</button>
                                    </a>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="basis-1/3 rounded-md shadow-md border-2">
                        <div className='flex flex-col w-full h-full p-2 '>
                            <img src={instructorImg} alt="instructor" className='h-3/4' />
                            <div className=' flex flex-row w-full h-full justify-around'>
                                    <div className="basis-2/3">
                                    <a href="/admin/manageStudents">
                                        <button className="bg-indigo-600 text-white w-full py-2 px-2 mt-2 rounded-md shadow-md">Manage Instructors</button>
                                    </a>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="basis-1/3 rounded-md shadow-md border-2">
                        <div className='flex flex-col w-full p-2'>
                            <div className=' h-1/2 w-3/4'>
                            <img src={courseImg} alt="instructor" className='h-3/4' />
                            </div>
                            <div className=' flex flex-row w-full h-full justify-around'>
                                    <div className="basis-2/3">
                                    <a href="/admin/manageCourses">
                                        <button className="bg-indigo-600 text-white w-full py-2 px-2 mt-2 rounded-md shadow-md">Manage Courses</button>
                                    </a>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>

            </div>
            </div>
        </>
    )
}
