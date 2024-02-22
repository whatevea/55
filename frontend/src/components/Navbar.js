import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from "react";

export const Navbar = () => {
    const [open, setOpen] = useState(0)

    const toggleNavbar = () => {
        setOpen(!open);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="_allitems w-full flex items-center font-semibold ml-4 gap-4 ">
            <div onClick={toggleNavbar} className='block md:hidden text-3xl cursor-pointer '>
                        {open ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
                <img className="h-8" src={logo} />
                <div className={` duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
                open ? 'top-[9%]' : 'top-[-100%]'} md:w-screen w-full flex items-center px-5`}>
                    <div className={`flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8`}>
                        <Link to="/register" className=" hover:text-green-500" >Find Talent</Link>
                        <Link to="/login" className=" hover:text-green-500" >Find Work<FaAngleDown className="inline" /> </Link>
                        <Link to="/login" className=" hover:text-green-500">Why Upwork?<FaAngleDown className="inline" /> </Link>
                        <Link to="/login" className=" hover:text-green-500" >Blog Enterprise</Link>
                    </div>
                </div>
                <div className="searchbox ml-10 w-1/2 h-full " >
                    <div className="border-2 flex items-center border-black rounded-3xl p-2"> <FaSearch />
                        < input placeholder="Search .." className="ml-2 outline-none" />
                    </div>
                    </div>
                    <div className="loginregister flex gap-4 ">    
                    <Link to="/login" className=" hover:text-green-500"> Login </Link>
                    <Link to="/register" className="text-white"> <span className="hover:bg-green-700 rounded-3xl bg-green-500 p-3"> Register </span> </Link>
                    </div>  
            </div>
        </div >
    )
}

