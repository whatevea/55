import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import FreelancerLayout from "./layouts/FreelancerLayout";
import HireLayout from "./layouts/HireLayout";
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
import MyJobs from "./components/JobPost/MyJobs";
import SearchJob from "./components/JobPost/SearchJob";
import MessageLayout from "./components/messages/MessageLayout";
function App() {
  const userData = useSelector((state) => state.User);
  const isLoggedIn = userData.isLoggedIn;
  const userType = userData?.userData?.user_type;
  console.log(isLoggedIn, userType);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userType === "freelancer" ? (
                <Navigate to="/freelancer/jobseeker" />
              ) : (
                <Navigate to="/hirer/jobpost" />
              )
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/freelancer" element={<FreelancerLayout />}>
          <Route path="jobseeker" element={<JobSeekerLayout />} />
          <Route path="apply/:id" element={<ApplyForJob />} />
          <Route path="search" element={<SearchJob />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="message" element={<MessageLayout />} />
        </Route>

        <Route path="/hirer" element={<HireLayout />}>
          <Route path="jobpost" element={<JobPostLayout />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
