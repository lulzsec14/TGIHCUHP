import React, { useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../context/globalState';
import { useLogOut } from '../../hooks/studentHooks/useLogOut';
import DashboardIcon from '@rsuite/icons/Dashboard';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import ExploreIcon from '@rsuite/icons/Explore';
import GearIcon from '@rsuite/icons/Gear';
import AdminIcon from '@rsuite/icons/Admin';

const Sidebar = ({active}) => {
    const [letter,setLetter] = useState("");
    const [roleType,setRoleType] = useState("");
    const navigate = useNavigate();
    const {saveUserDetails,saveUserOnLogin} = useContext(globalContext);
    const {mutate,isLoading,error} = useLogOut();

    useEffect(() => {
        const userLetter = Cookies.get("userLetter");
         const role = Cookies.get("roleType");
         //console.log(role);
        /*if(role!=="student" || role!=="instructor" || role!=="admin"){
            navigate("/")
        } */
        setRoleType(role);
        setLetter(userLetter.charAt(0));
    }, [navigate]);

    const handleLogOut  = () => {
        Cookies.remove("userDetailsCookie");
        Cookies.remove("userLetter");
        Cookies.remove("roleType")
        mutate();
        saveUserDetails(null);
        navigate("/");
    }
  return (
    <div className="col-span-1 h-full mr-3">
                <div className="w-60 h-full absolute">
                    <div className=" flex mx-auto py-2 my-3 justify-around">
                        {/* <img src={avatarImg} className="rounded-full w-32 border-2" alt="profile" /> */}
                        <div className = "bg-indigo-400 rounded-full w-36 h-36 border-2 flex items-center justify-center shadow-lg">
                            <p className='text-5xl font-bold'>{letter}</p> {/* place it in center  */}
                        </div>
                    </div>
                    <ul className="px-5 mt-10">
                        <li className={active==="dashboard" ? "w-full py-2 justify-around mb-8 font-semibold border-2 bg-indigo-600 rounded-md shadow-md" : "w-full py-2 justify-around mb-8 font-semibold border-2 rounded-md shadow-md"}>
                            <a href={roleType === "student" ? "/dashboard" : roleType==="instructor" ? "/instructor/dashboard" : "/admin/dashboard"} className={active==="dashboard" ? "text-white no-underline hover:no-underline" : "text-black no-underline hover:no-underline"}>
                                <p className={active==="dashboard" ? "px-2 text-white hover:text-white" : "px-2 text-black hover:text-black" }><DashboardIcon /> <span> DASHBOARD</span></p>
                            </a>
                        </li>
                        <li className={active==="courses" ? "w-full py-2 justify-around mb-8 font-semibold border-2 bg-indigo-600 rounded-md shadow-md " : "w-full py-2 justify-around mb-8 font-semibold border-2 rounded-md shadow-md"}>
                            <a href={roleType === "student" ? "/courses" : roleType==="instructor" ? "/instructor/manageCourses" : "/admin/manageAdmins"} 
                            className={active==="courses" ? "text-white no-underline hover:no-underline" : "text-black no-underline hover:no-underline"}>
                            <p className={active==="courses" ? "px-2 text-white hover:text-white" : "px-2 text-black hover:text-black" }>
                                {roleType==="student" ? <><ExploreIcon /> <span> COURSES</span></> : roleType==="instructor" ?<><GearIcon /> <span> MANAGE</span></> : <><AdminIcon /> ADMINS</> }
                            </p>
                            </a>
                        </li>
                        <li className={active==="profile" ? "w-full py-2 justify-around mb-8 font-semibold border-2 bg-indigo-600 rounded-md shadow-md text-white" : "w-full py-2 justify-around mb-8 font-semibold border-2 rounded-md shadow-md"}>
                            <a href={roleType === "student" ? "/profile" : roleType==="instructor" ? "/instructor/profile" : "/admin/profile"} className={active==="profile" ? "text-white no-underline hover:no-underline" : "text-black no-underline hover:no-underline"}>
                            <p className={active==="profile" ? "px-2 text-white hover:text-white" : "px-2 text-black hover:text-black" }><UserInfoIcon /> <span> PROFILE</span></p>
                            </a>
                        </li>
                    </ul>
                    <div className='flex justify-around'>
                        
                        <button className='bottom-20 bg-red-500 w-56 justify-around py-2  mt-20 text-white rounded-md shadow-md' onClick={handleLogOut}>
                            LOGOUT
                        </button>
                        
                    </div>
                </div>
            </div>
  )
}

export default Sidebar