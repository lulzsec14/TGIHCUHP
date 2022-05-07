import React, { useEffect, useState } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { useGetAllAdmins } from '../../hooks/adminHooks/useGetAllAdmins';
import { Loader, Modal } from 'rsuite';
import { useCreateAdmin } from '../../hooks/adminHooks/useCreateAdmin';

const AdminManage = () => {
    const [adminList,setAdminList] = useState();
    const [adminName,setAdminName] = useState("");
    const [email,setEmail] = useState("");
    const [adminContact,setAdminContact] = useState("");
    const [adminAddress,setAdminAddress] = useState("");
    const [adminPassword,setAdminPassword] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
    },[navigate])


    const handleGetAllAdminsSuccess = (data) => {
        setAdminList(data?.data?.data?.admins);
        //console.log(data);
    }
    const handleGetAllAdminsError = (error) => {
        console.log(error?.response);
    }

    const handleCreateAdmin = e => {
        e.preventDefault();
        
        const adminDetails = {
            adminName:adminName,
            adminContact:adminContact,
            adminAddress:adminAddress,
            email:email,
            adminPassword:adminPassword,
            passwordConfirm:passwordConfirm
        }
        createAdmin(adminDetails);
        setOpen(false);
    }

    const handleCreateAdminError = error => {
        console.log(error?.response);
    }

    const {data,isLoading,isFetching,isError,error} = useGetAllAdmins(handleGetAllAdminsSuccess,handleGetAllAdminsError);
    const {mutate:createAdmin} =  useCreateAdmin(handleCreateAdminError);

    if(isLoading || isFetching){
        return <div><Loader size="md" /></div>
    }

    return (
        <>
            <div className="grid grid-cols-6 font-lato">
            <Sidebar active="courses" />
            
            <div className="col-span-5">
                <div className="flex flex-row w-full">
                    <h3 className="text-4xl font-bold"> Manage Admin</h3>
                </div>
                <div className="col-span-5 mx-20 py-4">
                    <button className='absolute top-12 right-20 bg-indigo-600 py-2 text-white px-2 rounded-md shadow-md'  onClick={() => setOpen(true)}><ExpandOutlineIcon /> Create Admin</button>
                </div>
                <ul>
                    {adminList?.map(admin => (
                        <li key={admin?._id}>
                            <div className="flex flex-row mt-10">
                                <div className="w-full rounded-md border-2 mb-3 p-2 mx-20 ">
                                    <h4 className="text-xl font-bold">{admin?.adminName}</h4>
                                    <p>Admin Email - <span className="text-indigo-600">{admin?.email}</span></p>
                                    <p>Admin Contact - <span className="text-indigo-600">{admin?.adminContact}</span> </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Modal open={open} backdrop="static" keyboard={false} onClose={() => setOpen(false)}>
                        <Modal.Header>
                            <Modal.Title>Create course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleCreateAdmin}>
                          <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                <input 
                                    type="text" name="name"  
                                    value={adminName}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setAdminName(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="email">Email</label> <br />
                                    <input 
                                    type="text" name="email"  
                                    value={email}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setEmail(e.target.value)} required
                                   
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="adminContact">Contact</label> <br />
                                    <input 
                                    type="text" name="adminContact"  
                                    value={adminContact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setAdminContact(e.target.value)} required
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="adminAddress">Address</label> <br />
                                <input 
                                    type="text" name="email"  
                                    value={adminAddress}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setAdminAddress(e.target.value)} required />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="password">Password</label> <br />
                                <input 
                                    type="password" name="password"  
                                    value={adminPassword}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setAdminPassword(e.target.value)} required minLength={8}/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="passwordConfirm">Confirm Password</label> <br />
                                <input 
                                    type="password" name="passwordConfirm"  
                                    value={passwordConfirm}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setPasswordConfirm(e.target.value)} required minLength={8}/>
                                </div>
                            </div>

                            {errorMessage && <div className='flex flex-row px-3 py-1'>
                              <div className='bg-red-300 border-2'>
                                <h4 className='text-normal font-bold text-red-700'>{errorMessage}</h4>
                              </div>
                            </div>}

                            <div className='flex flex-row px-3'>
                              <div className="basis-1/2">
                                <button type="submit" className="bg-indigo-600 mt-4 w-full text-white h-10 rounded-md shadow-md">
                                  Create Admin
                                </button>
                              </div>
                            </div>
                        </form>
                        </Modal.Body>
                        
                        </Modal>
            </div>
            </div>    
        </>
    )
}

export default AdminManage