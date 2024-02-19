import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
export const Navbar = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="_allitems w-full flex items-center font-semibold ml-4 gap-4">
                <img className="h-8" src={logo} />
                <Link to="/register" className="mx-4 hover:text-green-500" >Find Talent</Link>
                <Link to="/login" className=" hover:text-green-500" > Find Work <FaAngleDown className="inline" /> </Link>
                <Link to="/login" className=" hover:text-green-500">Why Upwork? <FaAngleDown className="inline" /> </Link>
                <Link to="/login" className=" hover:text-green-500" >  Blog Enterprise  </Link>
                <div className="searchbox ml-10 w-1/4 h-full " >
                    <div className="border-2 flex items-center border-black rounded-3xl p-2"> <FaSearch />
                        < input placeholder="Search .." className="ml-2 outline-none" />
                    </div>
                </div>
                <div className="loginregister flex gap-4">
                    <Link to="/login" className=" hover:text-green-500"> Login </Link>
                    <Link to="/login" className="text-white"> <span className="hover:bg-green-700 rounded-3xl bg-green-500 p-3"> Register </span> </Link>
                </div>
            </div>
        </div >
    )
}