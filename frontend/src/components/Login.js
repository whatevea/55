import React, { useState } from "react"; // Import useState from React
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { toastConfig } from "../config/toastConfig";
import http from "../config/http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../redux/reducers/userSlice";
import { ScaleLoader } from "react-spinners";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.User?.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn) {
            toast.error("You are logged in sorry !!", toastConfig)
            navigate("/")
        }
    }, [])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Set loading to true to show the loader animation
            setLoading(true);

            const response = await http.post("auth/login", formData); // Assuming formData contains username/email and password
            if (response.status === 201) toast.warn(response?.data?.message, toastConfig);

            // Check if login was successful based on server response            
            if (response.status === 200) {

                const userData = {
                    _id: response.data._id,
                    email: response.data.email,
                    fname: response.data.fname,
                    user_type: response.data.user_type,

                }

                dispatch(login({ isLoggedIn: true, userData: userData, token: response.data?.token }))

                // Show success message
                toast.success('Login successful');

                // Redirect to homepage after successful login
                setTimeout(() => {
                    setLoading(false);
                    navigate('/')
                }, 1000);

            } else {
                // Show error message if login was not successful
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // setLoading(false);
            // Show error message if there was an error making the request
            toast.error('An error occurred. Please try again later.');
            console.error('Login error:', error);
        }
    }

    return (
        <div>
            {/* Display the loader only when loading is true */}
            {loading ?
                (
                    <div className="flex justify-center items-center mx-auto h-screen">
                        <ScaleLoader color="#4caf50" loading={loading} height={55} width={8} radius={2} margin={2} />
                    </div>
                ) :
                (
                    <div className="flex justify-center w-full animate__animated animate__fadeInLeft my-10 max-w-lg mx-auto">
                        <div className="h-[fit-content] justify-center px-6 py-12 lg:px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px] w-full rounded-xl mx-auto sm:mx-auto">
                            <div className="w-full">
                                <svg className="w-[150px] h-[30px] mx-auto" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 102 28" role="img" aria-hidden="true">
                                    <path fill="#14a800"
                                        d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5-4.54,5m0-13.34a7.77,7.77,0,0,0-7.9,6.08,26,26,0,0,1-1.93-5.62H12v7.9c0,2.87-1.3,5-3.85,5s-4-2.12-4-5l0-7.9H.49v7.9A8.61,8.61,0,0,0,2.6,20a7.27,7.27,0,0,0,5.54,2.35c4.41,0,7.5-3.39,7.5-8.24V8.77a25.87,25.87,0,0,0,3.66,8.05L17.34,28h3.72l1.29-7.92a11,11,0,0,0,1.36,1,8.32,8.32,0,0,0,4.14,1.28h.34A8.1,8.1,0,0,0,36.37,14a8.12,8.12,0,0,0-8.19-8.31">
                                    </path>
                                    <path fill="#14a800"
                                        d="M80.8,7.86V6.18H77.2V21.81h3.65V15.69c0-3.77.34-6.48,5.4-6.13V6c-2.36-.18-4.2.31-5.45,1.87">
                                    </path>
                                    <polygon fill="#14a800"
                                        points="55.51 6.17 52.87 17.11 50.05 6.17 45.41 6.17 42.59 17.11 39.95 6.17 36.26 6.17 40.31 21.82 44.69 21.82 47.73 10.71 50.74 21.82 55.12 21.82 59.4 6.17 55.51 6.17">
                                    </polygon>
                                    <path fill="#14a800"
                                        d="M67.42,19.07c-2.59,0-4.53-2.05-4.53-5s2-5,4.53-5S72,11,72,14s-2,5-4.54,5m0-13.35A8.1,8.1,0,0,0,59.25,14,8.18,8.18,0,1,0,75.6,14a8.11,8.11,0,0,0-8.18-8.31">
                                    </path>
                                    <path fill="#14a800"
                                        d="M91.47,14.13h.84l5.09,7.69h4.11l-5.85-8.53a7.66,7.66,0,0,0,4.74-7.11H96.77c0,3.37-2.66,4.65-5.3,4.65V0H87.82V21.82h3.64Z">
                                    </path>
                                </svg>
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Log In
                                </h2>
                            </div>

                            <div className="mt-10 mx-auto">
                                <form className="space-y-6" onSubmit={handleSubmit} >
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                            Email Address:
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="block rounded-md border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900    placeholder:text-gray-400 w-full focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="password" className="inline-block text-base font-medium leading-6 text-gray-900 ">
                                            Password:
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="block rounded-md border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900    placeholder:text-gray-400 w-full focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                        >
                                            Log In
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-2 text-center text-sm text-gray-500">
                                    Create an Account?{' '}
                                    <Link to="/auth/register" className="font-semibold leading-6 text-green-600 hover:text-green-500 text-base">
                                        Register
                                    </Link>
                                </p>
                                <div className="text-sm text-center mt-2">
                                    <a href="#" className="font-semibold text-green-600 hover:text-green-500 text-center">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default Login;




