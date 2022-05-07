import React, { useEffect, useState } from 'react'
import { Loader, Panel, Modal } from 'rsuite'
import Cookies from "js-cookie"
import Sidebar from '../Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'
import { useGetAssignedCourses } from '../../hooks/instructorHooks/useGetInstructorCourses'
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { useCreateCourse } from '../../hooks/instructorHooks/useCreateCourse'
import { toast } from 'react-toastify'

const ManageCourses = () => {
    const navigate = useNavigate();
    const [assignedCourses,setAssignedCourses] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    
    const [open, setOpen] = useState(false);
    const [courseTitle,setCourseTitle] = useState("");
    const [courseCode,setCourseCode] = useState("");
    const [courseDuration,setCourseDuration] = useState("");
    const [courseCredits,setCourseCredits] = useState(0);
    const [courseLevel,setCourseLevel] = useState("beginner");
    const [courseDescription,setCourseDescription] = useState("");
    //const [enrolledCourses,setEnrolledCourses] = useState([]);
    //const [searchTerm,setSearchTerm] = useState("");
    //const [filteredList,setFilteredList] = useState();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
        /* const unEnrolledCourses = allCourses.filter(course => !(enrolledCourses.find(courseEnrolled => courseEnrolled._id === course._id)));
        const filteredData = unEnrolledCourses.filter((course)=>course?.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredList(filteredData); */
    }, [navigate]);

    const handleAssignedCoursesSuccess = (data) => {
        console.log(data?.data?.data);
        setAssignedCourses(data?.data?.data?.courses);
    }

    const handleAssignedCoursesError = (error) => {
        setErrorMessage(error?.response?.data?.message)
    }

    /* const handleCreateCourseSuccess = data => {
        console.log(data);
    } */

    const handleCreateCourseError = error => {
        toast.error("Some error occured!")
    }

    const handleCreateCourse = e => {
        e.preventDefault();
        setOpen(false);
        const courseDetails = {
            courseTitle:courseTitle,
            courseCode:courseCode,
            courseDuration:courseDuration,
            credits:courseCredits,
            courseLevel:courseLevel,
            courseDescription:courseDescription
        }
        createCourse(courseDetails);
    }

    const {data,isLoading,isFetching,isError,error} =  useGetAssignedCourses(handleAssignedCoursesSuccess,handleAssignedCoursesError);
    const {mutate:createCourse,isLoading:createCourseLoading} = useCreateCourse(handleCreateCourseError)

    if(isLoading || isFetching || createCourseLoading){
        return <div><Loader size="md" /></div>
    }
    if(error){
        return <div>{errorMessage}</div>
    }

    return (
        <>
            <div className='grid grid-cols-6 font-lato'>
                <Sidebar active="courses" />
                <div className='col-span-5'>
                    <div className="flex flex-row w-full">
                        <h3 className="text-4xl font-bold"> Manage Courses</h3>
                    </div>
                    {assignedCourses.length===0 &&  <h5 className=' text-gray-500 font-bold'>No course created!</h5>}
                    <div className='grid grid-cols-6 mt-16 gap-y-5 gap-x-5 mx-5'>
                        {assignedCourses?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel bordered header={course?.courseTitle} shaded className='min-h-full'>
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold p-2'>Enrolled Students - <span className='font-semibold text-indigo-400'>{course?.enrolledCandidates}</span> 
                                    </div>
                                    <div className='font-semibold p-2'>Total feedbacks - <span className='font-semibold text-indigo-400'>{course?.courseFeedbacks?.length}</span> 
                                    </div>
                                    <div className='font-semibold p-2'>Course Duration - <span className='font-semibold text-indigo-400'>{course?.courseDuration}</span> 
                                    </div>
                                    <a href={`/instructor/manageCourses/${course?._id}`}>
                                        <button className="bg-indigo-600 text-white w-full py-2 mt-2 rounded-md shadow-md">View Course</button>
                                    </a>
                            </Panel>
                        </div>))}
                        <button className='absolute top-12 right-20 bg-indigo-600 py-2 text-white px-2 rounded-md shadow-md' onClick={() => setOpen(true)}> <ExpandOutlineIcon /> Create A Course</button>
                        
                        <Modal open={open} backdrop="static" keyboard={false} onClose={() => setOpen(false)}>
                        <Modal.Header>
                            <Modal.Title>Create course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleCreateCourse}>
                          <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="courseTitle">Course Title</label> <br />
                                <input 
                                    type="text" name="courseTitle"  
                                    value={courseTitle}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setCourseTitle(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="courseCode">Course Code</label> <br />
                                    <input 
                                    type="text" name="courseCode"  
                                    value={courseCode}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setCourseCode(e.target.value)} required
                                    minLength={6} maxLength={6}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="courseDuration">Course Duration</label> <br />
                                    <input 
                                    type="text" name="courseDuration"  
                                    value={courseDuration}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setCourseDuration(e.target.value)} required
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="courseCredits">Course Credits</label> <br />
                                <input 
                                    type="text" name="email"  
                                    value={courseCredits}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2"
                                    onChange={e => setCourseCredits(e.target.value)} required maxLength={2}/>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="courseLevel">Course Level</label>
                                <select className="form-select form-select-sm mb-3
                                    w-full
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    focus:text-gray-700 focus:bg-white focus:outline-none"
                                    value={courseLevel}
                                    onChange = {e => setCourseLevel(e.target.value)}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5 px-4'>
                                <div className='w-full'>
                                <label htmlFor="courseDescription">Course Description</label> <br />
                                <textarea name="courseDescription" id="courseDescription" cols="40" rows="5" placeholder='Max 700 characters...' value={courseDescription} className='shadow-md rounded-md border-0' onChange={e => setCourseDescription(e.target.value)} required maxLength={700}></textarea>
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
                                  Create Course
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

export default ManageCourses