import { useState } from "react"; import { MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaKey, FaUserAstronaut } from "react-icons/fa";
import http from "../config/http";
import { toast } from "react-toastify";
const Register = () => {
    const [accountType, setAccountType] = useState("freelancer");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        user_name: "",
        password: "",
    });

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

    const registerUser = async () => {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Invalid email format");
                return;
            }

            // Submit registration data
            await http.post("/auth/register", { ...formData, "user_type": accountType });
            toast("Registration successful!");

            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            // Handle registration error
            console.error("Registration failed:", error);
            // Optionally, you can show an error message to the user
        }
    }

    return (
        <div className="mt-14 flex justify-center w-full h-full " >
            <div className="border border-gray-400 rounded-md p-10 flex flex-col text-center">
                <h1 className="text-2xl font-bold mb-8">Register account:</h1>
                <span className="text-left my-2">Account Type:</span>
                <div className="accountType flex justify-around">
                    <div className={`rounded-md h-22 w-1/2 border-2 cursor-pointer border-gray-400  ${accountType === "freelancer" ? "border-green-500 font-bold" : " border-gray-400"}`} onClick={() => changeAccountType("freelancer")} >
                        Freelancer
                    </div>
                    <div className={`rounded-md h-22 w-1/2 cursor-pointer border-2 border-gray-400  ${accountType === "hirer" ? "border-green-500 font-bold" : " border-gray-400"}`} onClick={() => { changeAccountType("hirer") }}>
                        Hirer
                    </div>
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                    <MdOutlineDriveFileRenameOutline className="text-2xl mr-2 " />
                    <label className="mr-2">FirstName:</label>
                    <input className="outline-none" placeholder="FirstName" name="fname" value={formData.fname} onChange={handleInputChange} />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                    <MdOutlineDriveFileRenameOutline className="text-2xl mr-2 " />
                    <label className="mr-2">Lastname:</label>
                    <input className="outline-none" placeholder="Lastname" name="lname" value={formData.lname} onChange={handleInputChange} />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                    <MdOutlineAlternateEmail className="text-2xl mr-2 " />
                    <label className="mr-2">Email:</label>
                    <input className="outline-none" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                    <FaUserAstronaut className="text-2xl mr-2 " />
                    <label className="mr-2">Username:</label>
                    <input className="outline-none" placeholder="Username" name="user_name" value={formData.user_name} onChange={handleInputChange} />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2">
                    <FaKey className="text-2xl mr-2 " />
                    <label className="mr-2">Password:</label>
                    <input type={showPassword ? "text" : "password"} className="outline-none" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                    {showPassword ? <MdVisibilityOff className="text-2xl cursor-pointer" onClick={togglePasswordVisibility} /> : <MdVisibility className="text-2xl cursor-pointer" onClick={togglePasswordVisibility} />}
                </div>
                <button className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600" onClick={registerUser}>Continue</button>
            </div>
        </div >
    )
}

export default Register;
