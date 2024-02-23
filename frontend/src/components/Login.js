import React, { useState } from "react"; // Import useState from React
import { CgProfile } from "react-icons/cg";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import http from "../config/http";

const Login = () => {
    const navigate = useNavigate()
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
            const response = await http.post("auth/login", formData); // Assuming formData contains username/email and password
            // Check if login was successful based on server response
            console.log('response.status contains', response.status);
            if (response.status === 200) {
                // Redirect to homepage after successful login
                // Show success message
                toast.success('Login successful');
                if (response.data) {
                    localStorage.setItem('userData',
                    JSON.stringify(response.data))
                }
                // setLoading(false);
                navigate('/homepage')
                console.log('we are here after routing to homepage');
                return response.data
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
        <div className="mt-14 flex justify-center w-full h-full">
            <div className="border border-gray-400 rounded-md p-10 flex flex-col text-center">
                <h1 className="text-2xl font-bold">Login to Upwork</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                        <CgProfile className="text-2xl mr-2" />
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="outline-none"
                            placeholder="Username or Email"
                            required
                        />
                    </div>
                    <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                        <FaKey className="text-2xl mr-2" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="outline-none"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600 px-2 w-24"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center mt-4">
                    <div className="border-t  border-gray-500 flex-1"></div>
                    <div className="px-4">Don't have an account?</div>
                    <div className="border-t  border-gray-500 flex-1"></div>
                </div>
                <Link
                    to="/register"
                    className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}

export default Login;
