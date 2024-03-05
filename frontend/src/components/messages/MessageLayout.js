import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";

const MessageLayout = () => {
  return (
    <div className="m-10">
      <div className="flex justify-center w-full">
        <div className="md:w-1/4 hidden md:flex p-3 flex-col">
          <h1 className="text-3xl">Messages</h1>
          <div className="relative">
            <button
              className="absolute mt-3 inset-y-0 left-0 flex items-center pl-3"
              type="submit"
            >
              <FiSearch />
            </button>
            <input
              className="border w-full mt-3 h-10 outline-none active:border-emerald-500 hover:border-emerald-500 border-gray-400 rounded-3xl pl-10 "
              placeholder="search"
            />
          </div>
          <div>
            <ul className="h-svh bg-gray-200 mt-3 rounded-xl flex justify-center">
              <li className="text-gray-600 p-4 text-center flex justify-center items-center ">
                Conversations will appear here
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:mt-80 justify-items-center w-1/2 md:w-3/4 p-3 gap-3">
          <h1 className="text-center font-extrabold text-xl md:text-4xl font-serif">
            Welcome to Messages
          </h1>
          <p className="text-gray-600 font-normal md:text-md text-sm text-center">
            Once you connect with a client, you’ll be able to chat and
            collaborate here
          </p>
          <button className="bg-green-600 hover:bg-green-500 text-white md:p-3 p-2 w-fit mt-3 text-xs md:text-base rounded-md text-center mx-auto">
            <Link to="searchjob" className="">
              Search for new projects
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageLayout;
