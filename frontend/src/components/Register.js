import { useState } from "react"; import { MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaKey, FaUserAstronaut } from "react-icons/fa";
import http from "../config/http";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import { ScaleLoader } from "react-spinners";
import logo from '../images/logo.png'
const Register = () => {
    const [accountType, setAccountType] = useState("freelancer");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
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
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                toast("Invalid Email");
                return;
            }

            // Set loading to true to show the loader animation
            setLoading(true);

            // Submit registration data
            await http.post("/auth/register", { ...formData, "user_type": accountType });
            toast("Registration successful!");

            // Redirect to login page after a delay (you can adjust the delay as needed)
            setTimeout(() => {
                setLoading(false);
                navigate('/auth/login');
            }, 2000);

            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            // Handle registration error
            console.error("Registration failed:", error);
            // Optionally, you can show an error message to the user
        } finally {
            // Set loading back to false after registration attempt
            // setLoading(false);
        }
    }

    return (
        <div>
            {/* Display the loader only when loading is true */}
            {loading ? (
                <div className="flex justify-center items-center mx-auto h-screen">
                    <ScaleLoader color="#4caf50" loading={loading} height={55} width={8} radius={2} margin={2} />
                </div>
            ) :
                <div className="flex flex-col md:w-1/3 w-full border py-8 px-10 rounded-xl my-10 md:mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_1px_5px] animate__animated animate__fadeInRight">
                    <div className=" flex flex-col">

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
                            Register
                        </h2>
                    </div>
                    <div className="accountType flex flex-col my-2 mt-5 md:flex-row md:justify-center md:w-full items-center gap-4 ">
                        <div className={`rounded-md h-22 w-full cursor-pointer border-2 border-green-600 text-center py-1.5 ${accountType === "freelancer" ? "border-black border-2 text-white bg-green-600" : " border-gray-400"}`} onClick={() => changeAccountType("freelancer")} >
                            Freelancer
                        </div>
                        <div className={`rounded-md h-22 w-full py-1.5 cursor-pointer  border-2 border-green-600 text-center ${accountType === "hire" ? "border-black border-2 text-white bg-green-600" : " border-gray-400"}`} onClick={() => { changeAccountType("hire") }}>
                            Hire
                        </div>
                    </div>
                    <div className="mt-10 w-full">
                        <form className="space-y-4" onSubmit={registerUser}>
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
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    disabled={loading} // Disable the button when loading
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
            }
        </div>
    )
}

export default Register;
