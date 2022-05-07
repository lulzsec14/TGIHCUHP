import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Loader, Modal, Panel } from 'rsuite';
import Sidebar from '../Sidebar/Sidebar';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import { useGetAllCourses } from '../../hooks/adminHooks/useGetAllCourses';

/* @TODOS -> 
    -> delete course impl
    -> check studentFeedback bug
    -> handle errors and success with toasts
*/

const AdminManageCourse = () => {
    const [courseList,setCourseList] = useState("");
    const [showAlertDialog,setShowAlertDialog] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        //console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleGetCoursesSuccess = data => {
        console.log(data?.data?.data?.resCourses);
        setCourseList(data?.data?.data?.resCourses);
    }
    const handleGetStudentsError = error => {
        console.log(error?.response);
    }

    const handleDeleteCourse = courseId => {
        setShowAlertDialog(false);
        //deleteCourse(courseId);
    }
    const handleDeleteCourseError = error => {
        console.log(error?.response)
    }

    const {data:allCourses,isLoading,isFetching} = useGetAllCourses(handleGetCoursesSuccess,handleGetStudentsError);
    //const {mutate:deleteCourse,isLoading:deleteCourseLoading} = useDeleteCourse(handleDeleteCourseError);
    
    if(isLoading || isFetching  /* deleteCourseLoading */){
        return <div><Loader size="md" /></div>
    }

    return (
        <>
            <div className="grid grid-cols-6 font-lato">
                <Sidebar active="dashboard" />
                <div className="col-span-5">
                    <div className="flex flex-row w-full">
                        <h3 className="text-4xl font-bold"> Manage Courses</h3>
                    </div>
                    <div className="col-span-5 mx-20 py-4">

                        {courseList?.map(course => (
                        <div className='col-span-4 rounded-md shadow-lg mb-4 border-2' key={course?._id}>
                            <div className="grid grid-cols-6 ">
                                <div className="flex col-span-4 justify-start mx-8 ">
                                    <h3 className="text-xl font-bold mt-4">{course?.courseTitle}</h3>
                                </div>
                                <div className='flex col-span-2 justify-end p-2'>
                                    <div className="flex justify-end ">
                                        <div>
                                            
                                            <button className=' bg-red-600 text-white px-3 py-3 rounded-md shadow-md m-1' onClick={()=>setShowAlertDialog(true)}>Delete</button>

                                            {showAlertDialog===true && 
                                            <>
                                                <Modal backdrop="static" role="alertdialog" open={showAlertDialog} onClose={() =>setShowAlertDialog(false)} size="xs">
                                                <Modal.Body>
                                                
                                                <RemindFillIcon style={{color:"red"}} /> <span className='font-bold'>All information related to course would be deleted forever. Are you sure you want to proceed ?</span>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <button onClick={() => handleDeleteCourse(course?._id)} className="bg-red-600 text-white px-3 py-2 rounded-md shadow-md m-1">
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
                                        <div className='font-semibold p-2'>Course code - <span>{course?.courseCode}</span></div> 
                                        <div className='font-semibold p-2'>Course level - <span>{course?.courseLevel}</span></div>
                                        <div className='font-semibold p-2'>Course credits - <span>{course?.credits}</span></div>
                                        <div className='font-semibold p-2'>Total enrolled students - <span>{course?.enrolledStudents?.length} </span></div>
                                    </Panel>
                                </div>                                  
                            </div>
                        </div>))}

                    </div>
                </div>
            </div>    
        </>
    )
}

export default AdminManageCourse