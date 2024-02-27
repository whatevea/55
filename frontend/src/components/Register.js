import { useState } from "react"; import { MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaKey, FaUserAstronaut } from "react-icons/fa";
import http from "../config/http";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
const Register = () => {
    const [accountType, setAccountType] = useState("freelance");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const changeAccountType = (type) => {
        if (accountType === type) return;
        setAccountType(type);
    }



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const registerUser = async (e) => {
        e.preventDefault()
        console.log('register button clicked');
        try {
            console.log('we are here inside try');
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Invalid email format");
                return;
            }
            console.log('we are here before submitting register form');
            // Submit registration data
            await http.post("/auth/register", { ...formData, "user_type": accountType });
            toast("Registration successful!");

            navigate('/auth/login')

            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            // Handle registration error
            console.error("Registration failed:", error);
            // Optionally, you can show an error message to the user
        }
    }

    return (
        <div className="flex flex-col md:w-1/3 w-full border py-8 px-10 rounded-xl my-10 md:mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px] animate__animated animate__fadeInRight">
            <div className=" flex flex-col">
                <img
                    className="mx-auto h-10 w-auto"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register
                </h2>
            </div>
            <div className="accountType flex flex-col my-2 mt-5 md:flex-row md:justify-center md:w-full items-center gap-4 ">
                <div className={`rounded-md h-22 w-full cursor-pointer border-2 border-green-600 text-center py-1.5 ${accountType === "freelance" ? "border-black border-2 text-white bg-green-600" : " border-gray-400"}`} onClick={() => changeAccountType("freelance")} >
                    Freelance
                </div>
                <div className={`rounded-md h-22 w-full py-1.5 cursor-pointer  border-2 border-green-600 text-center ${accountType === "hire" ? "border-black border-2 text-white bg-green-600" : " border-gray-400"}`} onClick={() => { changeAccountType("hire") }}>
                    Hire
                </div>
            </div>
            <div className="mt-10 w-full">
                <form className="space-y-4">
                    <div className="flex flex-col justify-between">
                        <label htmlFor="fname" className="block text-base font-medium leading-6 text-gray-900">
                            First Name:
                        </label>
                        <div className="mt-2 self-center w-full">
                            <input
                                id="fname"
                                name="fname"
                                type="fname"
                                autoComplete="fname"
                                required
                                placeholder="First Name"
                                value={formData.fname}
                                onChange={handleInputChange}
                                className="block rounded-md border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900    placeholder:text-gray-400 w-full  focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lname" className="block text-base font-medium leading-6 text-gray-900">
                            Last Name:
                        </label>
                        <div className="mt-2">
                            <input
                                id="lname"
                                name="lname"
                                type="lname"
                                autoComplete="lname"
                                required
                                placeholder="Last Name"
                                value={formData.lname}
                                onChange={handleInputChange}
                                className="block rounded-md border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900    placeholder:text-gray-400 w-full  focus:border-green-600 sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                    </div>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                Password:
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
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
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={registerUser}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Already Have an Account?{' '}
                    <Link to="/auth/login" className="font-semibold leading-6 text-green-600 hover:text-green-500 text-base">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
