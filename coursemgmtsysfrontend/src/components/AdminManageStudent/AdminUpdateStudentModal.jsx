import React, { useState } from 'react';
import {Loader, Modal} from "rsuite";
import { useGetStudent } from '../../hooks/adminHooks/useGetStudent';

const AdminUpdateStudentModal = ({studentId,showDetailsModal,setShowDetailsModal}) => { 
    const [user,setUser] = useState();

    const handleUpdateStudent = e => {
        e.preventDefault();

    }

    const handleGetStudentSuccess = data => {
        setUser(data?.data?.data?.user);
    }
    const handleGetStudentError = error => {
        console.log(error?.response);
    }

    const {data:student,isLoading,isFetching} = useGetStudent(studentId, handleGetStudentSuccess,handleGetStudentError);

    if(isLoading || isFetching){
        return <div><Loader size="md" /></div>
    }

    return(
        <Modal open={showDetailsModal} backdrop="static" keyboard={false} onClose={() => setShowDetailsModal(false)}>
        <Modal.Header>
            <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleUpdateStudent}>
        <div className='flex flex-row justify-between mb-5'>
                <div className='basis-1/3 px-4'>
                <label htmlFor="name">Name</label> <br />
                <input 
                    type="text" name="name"  
                    value={user?.studentName}
                    className="text-sm text-gray-base w-96 
                            py-5 px-4 h-2 mt-2 border 
                            border-gray-200 rounded mb-2" 
                    /* onChange={e => setCourseTitle(e.target.value)}  */required/>
                </div>
            </div>

            <div className='flex flex-row justify-between mb-5'>
                <div className='basis-1/3 px-4'>
                    <label htmlFor="studentContact">Contact</label> <br />
                    <input 
                    type="text" name="studentContact"  
                    value={user?.studentContact}
                    className="text-sm text-gray-base w-96 
                            py-5 px-4 h-2 mt-2 border 
                            border-gray-200 rounded mb-2" 
                    /* onChange={e => setCourseCode(e.target.value)} */ required
                    minLength={6} maxLength={6}
                    />
                </div>
            </div>

            <div className='flex flex-row justify-between mb-5'>
                <div className='basis-1/3 px-4'>
                    <label htmlFor="studentAddress">Address</label> <br />
                    <input 
                    type="text" name="studentAddress"  
                    value={user?.studentAddress}
                    className="text-sm text-gray-base w-96 
                            py-5 px-4 h-2 mt-2 border 
                            border-gray-200 rounded mb-2" 
                    /* onChange={e => setCourseDuration(e.target.value)} */ required
                    />
                </div>
            </div>

            <div className='flex flex-row px-3'>
            <div className="basis-1/2">
                <button type="submit" className="bg-indigo-600 mt-4 w-full text-white h-10 rounded-md shadow-md">
                Create Course
                </button>
            </div>
            </div>
        </form>
        </Modal.Body>
        
        </Modal>
    )
}

export default AdminUpdateStudentModal