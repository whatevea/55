import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layouts/AuthLayout";
import JobPostLayout from "./components/JobPost/JobPostLayout";
import JobSeekerLayout from "./components/JobSeeker/JobSeekerLayout";
import Navbar from "./components/commons/Navbar";
import ApplyForJob from "./components/commons/ApplyForJob";
import Footer from "./components/commons/Footer";
function App() {
    const isLoggedIn = useSelector((state) => state.User?.isLoggedIn);
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navbar />

            <Routes>
                <Route path="/" element={isLoggedIn ? <Homepage /> : <Navigate to="/auth/login" />} />
                <Route path="/jobseeker" element={<JobSeekerLayout />} />
                <Route path="/singlejobpost/:id" element={<ApplyForJob />} />
                <Route path="/jobpost" element={<JobPostLayout />} />
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>


            <Footer />
        </BrowserRouter>
    );
}

export default App;
