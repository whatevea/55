import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from "react";

export const Navbar = () => {
    const [open, setOpen] = useState(false)

    const toggleNavbar = () => {
        setOpen(!open);
    }

    return (
        <div className="flex flex-col w-full px-5 py-4 border-2 border-solid border-b-gray-300">
            <div className="_allitems w-full flex items-center font-semibold ml-4 gap-4 ">
                <div onClick={toggleNavbar} className='block md:hidden text-3xl cursor-pointer transition-transform duration-800 ease-in-out'>
                    {open ? <AiOutlineClose size={20} className="transition-transform duration-800 ease-in-out" /> : <AiOutlineMenu size={20} className="transition-transform duration-800 ease-in-out" />}
                </div>
                <div className="">
                    <img className="h-8" src={logo} />
                </div>
                <div className={` duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${open ? 'top-[67px] bg-white z-10 h-dvh' : 'top-[-100%]'} md:w-screen w-full flex items-center px-5`}>
                    <div className={`flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8`}>
                        <div className="border-2 flex items-center md:hidden lg:hidden justify-between border-black rounded-3xl p-2">
                            < input placeholder="Search..." className="ml-2 outline-none" />
                            <FaSearch />
                        </div>
                        <Link to="/register" className=" hover:text-green-500" >Find Talent</Link>
                        <Link to="/login" className=" hover:text-green-500" >Find Work<FaAngleDown className="inline" /> </Link>
                        <Link to="/login" className=" hover:text-green-500">Why Upwork?<FaAngleDown className="inline" /> </Link>
                        <Link to="/login" className=" hover:text-green-500" >Blog Enterprise</Link>
                        <Link to="/register" className="text-black block lg:hidden md:hidden"> <span className="hover:text-green-500 p-3 py-1.5 rounded-md"> Login </span> </Link>
                        <Link to="/register" className="text-white block lg:hidden md:hidden"> <span className="hover:bg-green-500  bg-green-600 p-3 py-1.5 rounded-md"> Register </span> </Link>

                    </div>
                </div>
                <div className="searchbox w-auto10 focus:w-[800px] hidden md:block lg:block">
                    <div className="border-2 flex items-center justify-between border-black rounded-3xl p-2">
                        < input placeholder="Search..." className="ml-2 outline-none" />
                        <FaSearch />
                    </div>
                </div>
                <div className="loginregister flex gap-4 ">
                    <Link to="/auth/login" className=" hover:text-green-500 hidden md:block"> Login </Link>
                    <Link to="/auth/register" className="text-white "> <span className="px-3 py-1.5 hover:bg-green-500 rounded-md bg-green-600 p-3 hidden md:block"> Register </span> </Link>
                </div>
            </div>
        </div >
    )
}

