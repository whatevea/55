import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';

// import Budget from './components/JobPost/Budget';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import AuthLayout from './layouts/AuthLayout';
import JobSeekerLayout from './components/JobSeeker/JobSeekerLayout';
import Navbar from './components/Navbar';
import ApplyForJob from './components/commons/ApplyForJob';
function App() {
    const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
    return (
        <BrowserRouter>
            <ToastContainer />
            {/* <Navbar /> */}
            <Routes>
                <Route path='/' element={isLoggedIn ? <Homepage /> : <Navigate to="/auth/login" />} />
                <Route path="singlejobpost/:id" element={<ApplyForJob />} />
                <Route path='/homepage' element={<Homepage />} >
                    <Route path="jobseeker" element={<JobSeekerLayout />} />
                </Route>
                <Route path='/auth' element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App;
