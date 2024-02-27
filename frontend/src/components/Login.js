import React, { useState } from "react"; // Import useState from React
import { CgProfile } from "react-icons/cg";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { toastConfig } from "../config/toastConfig";
import http from "../config/http";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/userSlice";
import logo from '../images/logo.png'

const Login = () => {
  const navigate = useNavigate()
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
      const response = await http.post("auth/login", formData); // Assuming formData contains username/email and password
      if (response.status === 201) toast.warn(response?.data?.message, toastConfig);

      // Check if login was successful based on server response            
      if (response.status === 200) {

        const userData = {
          _id: response.data._id,
          email: response.data.email,
          fname: response.data.fname,
        }

        const userDetails = {
          isLoggedIn: true,
          userData: userData,
          token: response.data?.token
        };

        dispatch(login(userDetails))
        if (response.data) {
          localStorage.setItem('userData',
            JSON.stringify(response.data))
        }
        // Show success message
        toast.success('Login successful');

        // Redirect to homepage after successful login
        navigate('/homepage')
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
    <div className="flex justify-center w-full animate__animated animate__fadeInLeft my-10 max-w-lg mx-auto">
      <div className="h-[fit-content] justify-center px-6 py-12 lg:px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px] w-full rounded-xl mx-auto sm:mx-auto">
        <div className="w-full">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
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
  );
}

export default Login;




