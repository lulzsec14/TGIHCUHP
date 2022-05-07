import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Loader, Modal, Panel } from 'rsuite';
import Sidebar from "../Sidebar/Sidebar";
import { useGetAllStudents } from '../../hooks/adminHooks/useGetAllStudents';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import { useDeleteStudent } from '../../hooks/adminHooks/useDeleteStudent';
import { useAdminUpdateStudent } from '../../hooks/adminHooks/useAdminUpdateStudent';
import { toast } from 'react-toastify';

const AdminManageStudent = () => {
    const [userList,setUserList] = useState("");
    const [showAlertDialog,setShowAlertDialog] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState();
    const [name,setName] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [studentId,setStudentId] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleGetStudentsSuccess = data => {
        //console.log(data?.data?.data?.students)
        setUserList(data?.data?.data?.students);
    }
    const handleGetStudentsError = error => {
        console.log(error?.response);
    }

    const handleDeleteStudent = studentId => {
        setShowAlertDialog(false);
        deleteStudent(studentId);
    }
    const handleDeleteStudentError = error => {
        console.log(error?.response)
    }

    const handleUpdateSuccess = () => {
        toast.success("Profile Updated Successfully")
        setShowModal(false);
    }

    const handleUpdateError = () => {
        toast.error("An error occured")
        showModal(false);
    }

    const handleUpdateStudentDetails = e => {
        e.preventDefault();
        const updatedDetails = {
            id:studentId,
            details:{
                studentName:name,
                studentContact:contact,
                studentAddress:address,
            }
        }
        updateStudent(updatedDetails,{
            onSuccess:handleUpdateSuccess,
            onError:handleUpdateError
        });
        setShowModal(false);
    }

    const {data:allStudents,isLoading,isFetching} = useGetAllStudents(handleGetStudentsSuccess,handleGetStudentsError);
    const {mutate:deleteStudent,isLoading:deleteStudentLoading} = useDeleteStudent(handleDeleteStudentError);
    const {mutate:updateStudent,isLoading:isUpdateStudentLoading} = useAdminUpdateStudent();
    
    const viewModal = student => {
        setModalData(student);
        setStudentId(student?._id)
        setName(student?.studentName);
        setContact(student?.studentContact);
        setAddress(student?.studentAddress)
        setShowModal(true);
    }

    if(isLoading || isFetching || deleteStudentLoading || isUpdateStudentLoading){
        return <div><Loader size="md" /></div>
    }

    return (
        <>
            <div className="grid grid-cols-6 font-lato">
                <Sidebar active="dashboard" />
                <div className="col-span-5">
                    <div className="flex flex-row w-full">
                        <h3 className="text-4xl font-bold"> Manage Students</h3>
                    </div>
                    <div className="col-span-5 mx-20 py-4">

                        {userList?.map(user => (
                        <div className='col-span-4 rounded-md shadow-lg mb-4 border-2' key={user?._id}>
                            <div className="grid grid-cols-6">
                                <div className="flex col-span-1 p-2">
                                    <div className = "bg-indigo-400 rounded-full w-20 h-20 border-2 flex items-center justify-center shadow-lg">
                                        <p className='text-3xl font-bold'>{user?.studentName?.charAt(0)?.toUpperCase()}</p> {/* place it in center  */}
                                    </div>
                                </div>
                                <div className="flex col-span-3 ">
                                    <h3 className="text-xl font-bold mt-4">{user?.studentName}</h3>
                                </div>
                                <div className='flex col-span-2 justify-end p-2'>
                                    <div className="flex justify-end ">
                                        <div>
                                            {/* <a href={`/admin/manageStudents/${user?._id}`}>
                                                <button className=' bg-indigo-600 text-white px-3 py-3 rounded-md shadow-md m-1'>Edit Details</button>
                                            </a> */}
                                            <button className=' bg-indigo-600 text-white px-3 py-3 rounded-md shadow-md m-1'onClick={() =>viewModal(user)}>Edit Details</button>
                                            <button className=' bg-red-600 text-white px-3 py-3 rounded-md shadow-md m-1' onClick={()=>setShowAlertDialog(true)}>Delete</button>

                                            {showAlertDialog===true && 
                                            <>
                                                <Modal backdrop="static" role="alertdialog" open={showAlertDialog} onClose={() =>setShowAlertDialog(false)} size="xs">
                                                <Modal.Body>
                                                
                                                <RemindFillIcon style={{color:"red"}} /> <span className='font-bold'>All information related to student would be deleted forever. Are you sure you want to proceed ?</span>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <button onClick={() => handleDeleteStudent(user?._id)} className="bg-red-600 text-white px-3 py-2 rounded-md shadow-md m-1">
                                                    Ok
                                                </button>
                                                <button onClick={() => setShowAlertDialog(false)} className="bg-gray-600 text-white px-3 py-2 rounded-md shadow-md m-1">
                                                    Cancel
                                                </button>
                                                </Modal.Footer>
                                            </Modal>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row ">
                                <div className="basis-2/3 ">
                                    <Panel>
                                        <div className='font-semibold p-2'>Email - <span>{user?.email}</span></div> 
                                        <div className='font-semibold p-2'>Address - <span>{user?.studentAddress}</span></div>
                                        <div className='font-semibold p-2'>Contact - <span>{user?.studentContact}</span></div>
                                        <div className='font-semibold p-2'>Total enrolled courses - <span>{user?.enrolledInCourses?.length} </span></div>
                                    </Panel>
                                </div>                                  
                            </div>
                        </div>))}
                        <Modal open={showModal} backdrop="static" keyboard={false} onClose={() => setShowModal(false)}>
                            <Modal.Header>{modalData?.studentName}</Modal.Header>
                            <Modal.Body>
                            <form onSubmit={handleUpdateStudentDetails}>
                          <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                <input 
                                    type="text" name="name"  
                                    placeholder={modalData?.studentName}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setName(e.target.value)} />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="contact">Contact</label> <br />
                                    <input 
                                    type="text" name="contact"  
                                    placeholder={modalData?.studentContact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setContact(e.target.value)} 
                                    minLength={10} maxLength={10}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="studentAddress">Address</label> <br />
                                    <input 
                                    type="text" name="studentAddress"  
                                    placeholder={modalData?.studentAddress}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setAddress(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row px-3'>
                              <div className="basis-1/2">
                                <button type="submit" className="bg-indigo-600 mt-4 w-full text-white h-10 rounded-md shadow-md">
                                  Update Details
                                </button>
                              </div>
                            </div>
                        </form>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>    
        </>
    )
}

export default AdminManageStudent