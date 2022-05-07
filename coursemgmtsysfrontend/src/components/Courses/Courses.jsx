import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useGetAllCourses } from '../../hooks/studentHooks/useGetStudentCourses';
import { useEnrollCourse } from '../../hooks/studentHooks/useEnrollCourse';
import {useGetEnrolledCourses} from "../../hooks/studentHooks/useGetEnrolledCourses"
import { Loader, Panel } from 'rsuite';
import { useExitCourse } from '../../hooks/studentHooks/useExitCourse';
import { toast } from 'react-toastify';

//@TODOS
/*
    IMPLEMENT VIEW ALL IN DASHBOARD  //done
*/

const Courses = () => {
    const navigate = useNavigate();
    const [allCourses,setAllCourses] = useState([]);
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const [searchTerm,setSearchTerm] = useState("");
    const [filteredList,setFilteredList] = useState();
    const [filteredEnrolledList,setFilteredEnrolledList] = useState();
    
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
        const unEnrolledCourses = allCourses.filter(course => !(enrolledCourses.find(courseEnrolled => courseEnrolled._id === course._id)));
        const filteredData = unEnrolledCourses.filter((course)=>course?.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        //create filter for enrolled courses
        setFilteredEnrolledList(enrolledCourses);
        setFilteredList(filteredData);
    }, [navigate,allCourses,searchTerm,enrolledCourses]);

    const handleEnrollCourseSuccess = (data) => {
        console.log(allCourses);
        setFilteredList(allCourses);
        toast.success("Enrolled successfully!")
        //console.log(filteredList);
        //console.log(data);
    }

    const handleEnrollCourseError = (error) => {
        console.log(error.response)
    }

    const handleEnrollCourse = (courseId) => {
        mutate(courseId,{
            onSuccess:handleEnrollCourseSuccess,
            onError:handleEnrollCourseError
        });
    }

    const handleGetEnrolledCourseSucess = (data) => {
        //console.log(data)
        setEnrolledCourses(data?.data?.data);
    }
    const handleGetEnrolledCourseError = (error) => {
        console.log(error.response);
    }

    const handleGetAllCoursesSuccess = (data) => {
        setAllCourses(data?.data?.data?.courses);
    }

    const handleGetAllCoursesError = (error) => {
        setErrorMessage(error?.response?.data?.message);
    }

    const handleExitCourseSuccess = (data) => {
        console.log(data);
        toast.success("Removed from course sucessfully!")
    }

    const handleExitCourseError = (error) => {
        console.log(error.response);
    }

    const handleExitCourse = (courseId) => {
        exitCourseMuatate(courseId,{
            onSuccess:handleExitCourseSuccess,
            onError:handleExitCourseError
        })
    }

    const {isLoading,data,isError,error,isFetching} = useGetAllCourses(handleGetAllCoursesSuccess,handleGetAllCoursesError); 
    const {data:studentData,isLoading:studentDetailsLoading,isError:IsStudentDetailsError,error:studentDetailsError} = useGetEnrolledCourses(handleGetEnrolledCourseSucess,handleGetEnrolledCourseError);
    const {mutate,isLoading:courseEnrollLoading} = useEnrollCourse();
    const {mutate:exitCourseMuatate,isLoading:exitCourseLoading} = useExitCourse();

    //console.log(enrolledCourses);

    if(isLoading || isFetching ||studentDetailsLoading ){
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
                        <h3 className="text-4xl font-bold"> Explore Courses</h3>
                    </div>
                    <div className="col-span-5 mx-20 py-4">
                    <form>
                        <input 
                        type="text" name="SearchBar" placeholder="Search Course" 
                        className="text-md text-gray-base border border-gray-200 rounded-md w-full" onChange={(e)=>setSearchTerm(e.target.value)} />
                    </form>
                    </div>
                    <h3 className="text-3xl font-bold"> Enrolled Courses</h3>
                    {enrolledCourses.length===0 &&  <h5 className=' text-gray-500 font-bold'>Not enrolled in any course!</h5>}
                    <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mx-5 mb-5'>
                        {enrolledCourses?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel bordered header={course?.courseTitle} shaded className='min-h-full'>
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
                                    </div>
                                    <button className="bg-red-600 text-white w-full py-2 rounded-md shadow-md" onClick={() =>handleExitCourse(course?._id)}>Unenroll</button>
                                    <a href={`/courses/${course?._id}`}>
                                        <button className="bg-indigo-400 text-white w-full py-2 mt-2 rounded-md shadow-md">View Course</button>
                                    </a>
                            </Panel>
                            
                        </div>))}
                        {/* make button if already enrolled and want to exit */}
                    </div>
                    <h3 className="text-3xl font-bold mt-2"> All Courses</h3>   {/* add spacing from card above */}
                    <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mx-5'>
                        {filteredList?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel bordered header={course?.courseTitle} shaded className='min-h-full'>
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
                                    </div>
                                    <button className="bg-indigo-400 text-white w-full py-2 rounded-md shadow-md" onClick={() =>handleEnrollCourse(course?._id)}>Enroll</button>
                                    <a href={`/courses/${course?._id}`}>
                                        <button className="bg-indigo-600 text-white w-full py-2 mt-2 rounded-md shadow-md">View Course</button>
                                    </a>
                            </Panel>
                        </div>))}
                    </div>
                </div>
            </div> 
        </>  
    )
}

export default Courses