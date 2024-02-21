import { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline } from "react-icons/md"
import { FaKey } from "react-icons/fa";
const Login = () => {
    const [accountType, setAccountType] = useState("freelancer")
    const changeAccountType = (type) => {
        if (accountType === type) return
        setAccountType(type)
    }


    return (
        <div className="mt-14 flex justify-center w-full h-full " >
            <div className="border border-gray-400 rounded-md p-10 flex flex-col text-center">



                <h1 className="text-2xl font-bold mb-8">Register account:</h1>

                <span className="text-left my-2 ">Account Type: </span>

                <div className="accountType flex justify-around">
                    <div className={`rounded-md h-22 w-1/2 border-2 cursor-pointer border-gray-400  ${accountType === "freelancer" ? "border-green-500 font-bold" : " border-gray-400"}`}
                        onClick={() => changeAccountType("freelancer")} >
                        Freelancer
                    </div>

                    <div className={`rounded-md h-22 w-1/2 cursor-pointer border-2 border-gray-400  ${accountType === "hirer" ? "border-green-500 font-bold" : " border-gray-400"}`}
                        onClick={() => { changeAccountType("hirer") }}
                    >
                        Hirer
                    </div>



                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <MdOutlineDriveFileRenameOutline className="text-2xl mr-2 " />
                    <label className="mr-2">FirstName:  </label>

                    <input className="outline-none" placeholder="FirstName" />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <MdOutlineDriveFileRenameOutline className="text-2xl mr-2 " />
                    <label className="mr-2">Lastname:  </label>

                    <input className="outline-none" placeholder="Lastname" />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <MdOutlineAlternateEmail className="text-2xl mr-2 " />
                    <label className="mr-2">Email: </label>
                    <input className="outline-none" placeholder="Email" />
                </div>
                <div className="flex border-2 border-gray-500 mt-6 rounded-md p-2" >
                    <FaKey className="text-2xl mr-2 " />
                    <label className="mr-2">Password:  </label>

                    <input type="password" className="outline-none" placeholder="Password" />
                </div>
                <button className="bg-green-500 text-white rounded-2xl p-2 mt-6 font-medium hover:bg-green-600" > Continue  </button>

            </div>
        </div >
    )
}

export default Login