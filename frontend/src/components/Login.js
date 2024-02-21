import { CgProfile } from "react-icons/cg";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div className="mt-14 flex justify-center w-full h-full " >
            <div className="border border-gray-400 rounded-md p-10 flex flex-col text-center">
                <h1 className="text-2xl font-bold">Login to Upwork</h1>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <CgProfile className="text-2xl mr-2 " />
                    <input className="outline-none" placeholder="Username or Email" />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <FaKey className="text-2xl mr-2 " />
                    <input type="password" className="outline-none" placeholder="Password" />
                </div>
                <button className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600" > Continue  </button>
                <div class="flex items-center mt-4">
                    <div class="border-t  border-gray-500 flex-1"></div>
                    <div class="px-4">Don't have account </div>
                    <div class="border-t  border-gray-500 flex-1"></div>
                </div>
                <Link to="/register" className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600">
                    Create Account
                </Link>
            </div>
        </div>
    )
}

export default Login