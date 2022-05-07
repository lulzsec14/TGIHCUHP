import {Routes,Route} from "react-router-dom";
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClientProvider,QueryClient} from "react-query";
import {GlobalProvider} from "./context/globalState";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Homepage from "./components/Homepage/Homepage";
import Courses from "./components/Courses/Courses";
import Profile from "./components/Profile/Profile";
import Check from "./components/Check/Check";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import { ToastContainer } from "react-toastify";
import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import InstructorProfile from "./components/InstructorProfile/InstructorProfile";
import ManageCourses from "./components/ManageCourses/ManageCourses";
import ManageCourseInfo from "./components/ManageCourseInfo/ManageCourseInfo";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import AdminManage from "./components/AdminManage/AdminManage";
import AdminManageStudent from "./components/AdminManageStudent/AdminManageStudent";
import AdminManageStudentUpdate from "./components/AdminManageStudent/AdminManageStudentUpdate";
import AdminManageCourse from "./components/AdminManageCourse/AdminManageCourse";

/* @TODOS -> 2 MAY 
  -> impl set courseFeedback from courseInfo
  -> add courseInfo component for edit course ans send studentFeedback
  -> add mail feature on course/instr/student delete from ADMIN
*/

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <ToastContainer autoClose={2500} limit={5} pauseOnHover={false} />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />

              <Route exact path ="/dashboard" element ={<Homepage />} />
              <Route exact path="/courses" element = {<Courses />} />
              <Route exact path="/profile" element = {<Profile />} />
              <Route exact path="/check" element= {<Check />} />
              <Route exact path="/courses/:courseId" element= {<CourseDetails />} />
              
              <Route exact path="/instructor/dashboard" element = {<InstructorDashboard />} />
              <Route exact path="/instructor/profile" element = {<InstructorProfile />} />
              <Route exact path="/instructor/manageCourses" element = {<ManageCourses />} />
              <Route exact path="/instructor/manageCourses/:courseId" element = {<ManageCourseInfo />} />

              <Route exact path="/admin/login" element ={<AdminLogin />} />
              <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
              <Route exact path="/admin/profile" element={<AdminProfile />} />
              <Route exact path="/admin/manageAdmins" element={<AdminManage />} />
              <Route exact path="/admin/manageStudents" element={<AdminManageStudent />} />
              <Route exact path="/admin/manageStudents/:studentId" element={<AdminManageStudentUpdate />} />
              <Route exact path="/admin/manageCourses" element={<AdminManageCourse />} />
            </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </GlobalProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
