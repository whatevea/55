import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { toastConfig } from "../config/toastConfig";
import http from "../config/http";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/userSlice";
import { ScaleLoader } from "react-spinners";

const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.User?.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            toast.error("You are logged in sorry !!", toastConfig);
            navigate("/");
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Check if email and password are empty and update state variables
        if (name === 'email') {
            validateEmail(value);
        } else if (name === 'password') {
            validatePassword(value);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(value.trim()));
    };

    const validatePassword = (value) => {
        setPasswordError(value.trim().length === 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are not empty
        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error("Email and password cannot be empty", toastConfig);
            validateEmail(formData.email);
            validatePassword(formData.password);
            return;
        }

        // Validate email and password
        validateEmail(formData.email);
        validatePassword(formData.password);

        if (emailError || passwordError) {
            toast.error("Please fix the validation errors", toastConfig);
            return;
        }

        try {
            // Set loading to true to show the loader animation
            setLoading(true);

            const response = await http.post("auth/login", formData);

            console.log('response is', response);

            if (response.status === 200) {
                const userData = {
                    _id: response.data._id,
                    email: response.data.email,
                    fname: response.data.fname,
                    lname: response.data.lname,
                    user_type: response.data.user_type,
                };

                dispatch(login({ isLoggedIn: true, userData: userData, token: response.data?.token }));
                toast.success('Login successful');

                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 1000);

            } else if (response.status === 400) {
                toast.warn(response.data.message, toastConfig);
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred.';
                toast.error(errorMessage, toastConfig);
                console.error('Login error:', error.response);
            } else if (error.message) {
                // The request was made but no response was received
                toast.error(`Request failed: ${error.message}`, toastConfig);
                console.error('Login error:', error.message);
            } else {
                toast.error('An unexpected error occurred.', toastConfig);
                console.error('Login error:', error);
            }
        }
    };
    
    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center mx-auto h-screen">
                    <ScaleLoader color="#4caf50" loading={loading} height={55} width={8} radius={2} margin={2} />
                </div>
            ) : (
                <div className="flex justify-center w-full animate__animated animate__fadeInLeft my-10 max-w-lg mx-auto">
                    <div className="h-[fit-content] justify-center px-6 py-12 lg:px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px] w-full rounded-xl mx-auto sm:mx-auto">
                        <div className="w-full">
                            <svg className="w-[150px] h-[30px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 28" role="img" aria-hidden="true">
                                {/* SVG Path */}
                            </svg>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Log In
                            </h2>
                        </div>

                        <div className="mt-10 mx-auto">
                            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                                            className={`block rounded-md border-2 border-solid ${emailError ? 'border-red-500' : 'border-gray-300'} px-2 py-1.5 text-gray-900 placeholder:text-gray-400 w-full focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none`}
                                        />
                                        {emailError && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
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
                                            className={`block rounded-md border-2 border-solid ${passwordError ? 'border-red-500' : 'border-gray-300'} px-2 py-1.5 text-gray-900 placeholder:text-gray-400 w-full focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none`}
                                        />
                                        {passwordError && <p className="text-red-500 text-xs mt-1">Password cannot be empty.</p>}
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
            )}
        </div>
    );
};

export default Login;
