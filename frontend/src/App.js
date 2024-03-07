import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import FreelancerLayout from "./layouts/FreelancerLayout"
import HireLayout from "./layouts/HireLayout"
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layouts/AuthLayout";
import JobPostLayout from "./components/JobPost/JobPostLayout";
import JobSeekerLayout from "./components/JobSeeker/JobSeekerLayout";
import Navbar from "./components/commons/Navbar";
import ApplyForJob from "./components/commons/ApplyForJob";
import Footer from "./components/commons/Footer"
import HirerJobList from "./components/commons/JobsList";
import ApplicationsofJob from "./components/commons/ApplicationsofJob";
import MyJobs from "./components/JobPost/MyJobs";
import Profile from "./components/commons/Profile";
import SearchForTalent from "./components/commons/SearchForTalent";
import Accordion from "./components/commons/AccordionComp";


function App() {
    const userData = useSelector((state) => state.User);
    const isLoggedIn = userData.isLoggedIn
    const userType = userData?.userData?.user_type;
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? (userType === "freelancer" ? <Navigate to="/freelancer/jobseeker" /> : <Navigate to="/hirer/dashboard" />) : <Navigate to="/auth/login" />
                    }
                />

                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="/freelancer" element={<FreelancerLayout />}>
                    <Route index element={<JobSeekerLayout />}/>
                    <Route path="jobseeker" element={<JobSeekerLayout />} />
                    <Route path="apply/:id" element={<ApplyForJob />} />
                    <Route path="myjobs" element={<MyJobs />}/>
                    <Route path="freelancer-profile" element={<Profile />}/>
                </Route>

                <Route path="/hirer" element={<HireLayout />}>
                    <Route index element={<JobPostLayout />} />
                    <Route path="jobpost" element={<JobPostLayout />} />
                    <Route path="dashboard" element={<HirerJobList />} />
                    <Route path="seeappliers/:job_id" element={<ApplicationsofJob />} />
                    <Route path="hirer-profile" element={<Profile />} />
                    <Route path="searchfortalent" element={<SearchForTalent />} />
                    <Route path="accordion" element={<Accordion />} />
                    

                    
                </Route>

            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
