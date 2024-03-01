import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TargetMarketPlace = () => {
  return (
    <div className="flex gap-40 ">
      <div className=" w-80 space-y-3 ml-6 mt-4">
        <div className=" bg-[#108a00] h-1 w-12"></div>
        <h4 className="font-semibold ">Talent Marketplace™</h4>
        <p className=" text-sm break-words">
          Learn about working with talent or explore your specific hiring needs.
        </p>
        <div className=" flex gap-4 py-2 text-blue-700 text-sm font-semibold underline">
          <Link>Learn More</Link>
          <div className=" flex justify-center flex-col scale-75 text-blue-700">
            <FaArrowRightLong />
          </div>
        </div>
      </div>
      <div className=" mt-16 space-y-6 text-sm mr-64">
        <ul>
          <Link>Development & IT</Link>
        </ul>
        <ul>
          <Link>Design & Creative</Link>
        </ul>
        <ul>
          <Link>Sales & Marketing</Link>
        </ul>
        <ul>
          <Link>Writing & Translation</Link>
        </ul>
        <ul>
          <Link>Admin & Customer Support</Link>
        </ul>
        <ul>
          <Link>Finance & Accounting</Link>
        </ul>
        <ul>
          <Link>HR & Training</Link>
        </ul>
        <ul>
          <Link>Legal</Link>
        </ul>
        <ul>
          <Link>Engineering & Architecture</Link>
        </ul>
        <ul className=" text-sm font-medium">
          <Link>See all Specialization</Link>
        </ul>
      </div>
    </div>
  );
};

export default TargetMarketPlace;
