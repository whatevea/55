import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userSlice";
import { toast } from 'react-toastify';

export default function MobileMenu() {
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()  

  useEffect(() => {
    // Retrieve user details from localStorage when the component mounts
    const storedUserDetails = localStorage.getItem("userData");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const userLoggedOut = () => {

    // Dispatch the logout action to update the Redux state
    dispatch(logout())

    localStorage.removeItem("userData");
    setUserDetails(null);

    // Show success message
    toast.success('Logout successful');

    navigate('/auth/login')
  }



  return (
    <div className="bg-white z-10">
      <div className="md:hidden mb-4">
        <h3 className="text-green-500 mx-2 font-semibold">Hi, {`${userDetails?.userData?.fname.toUpperCase()} ${userDetails?.userData?.lname.toUpperCase()}`}</h3>
      </div>

      {/* <div className="border-2 border-solid border-gray-300 rounded-md mt-4 mx-2 mb-4">
        <i className="fa-solid fa-magnifying-glass mx-2 scale-125 text-green-600"></i>
        <input
          className="outline-none bg-white text-black font-semibold p-1 w-3/4"
          type="text"
          placeholder="Search"
        />
      </div> */}
      <ul className="flex flex-col gap-4 mx-2">
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Find Talent <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Find Work <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        {/* <li className="flex items-center hover:text-green-500 cursor-pointer">
          Why Upwork? <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Blog Enterprise <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li> */}
      </ul>
      <div className="flex justify-between gap-4">
        {userDetails ? (
          <button
            className="text-white px-3 py-1 hover:bg-green-500 rounded-md bg-green-600 md:hidden items-center justify-center w-full mt-4"
            onClick={() => { userLoggedOut() }}
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col gap-4 items-center mx-2 mt-2 w-full">

            <Link
              className="hover:text-green-500 px-3 py-1 text-white bg-green-600 rounded-md flex items-center justify-center w-full"
              to="/auth/login"
            >
              Login
            </Link>


            <Link
              to="/auth/register"
              className="text-white px-3 py-1 hover:bg-green-500 rounded-md bg-green-600 flex items-center justify-center w-full"
            >
              Register
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}
