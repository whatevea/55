import React from "react";

export default function MobileMenu() {
  return (
    <>
      <div className="border-2 border-solid border-gray-300 rounded-md mt-4 mx-2">
        <i className="fa-solid fa-magnifying-glass mx-2 scale-125 text-green-600"></i>
        <input
          className="outline-none bg-white text-black font-semibold p-1 w-3/4"
          type="text"
          placeholder="Search"
        />
      </div>
      <ul className="flex flex-col gap-4 mx-2">
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Find Talent <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Find Work <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Why Upwork? <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
        <li className="flex items-center hover:text-green-500 cursor-pointer">
          Blog Enterprise <i className="fa-solid fa-angle-down ml-2 mt-1"></i>{" "}
        </li>
      </ul>
      <div className="flex flex-col gap-4 items-center mx-2">
        <button className="bg-green-500 text-white px-2 py-1 rounded-md w-full">
          Login
        </button>
        <button className="bg-green-500 text-white px-2 py-1 rounded-md w-full">
          Register
        </button>
      </div>
    </>
  );
}
