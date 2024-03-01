import React from "react";
import { MdMoreHoriz } from "react-icons/md";

export default function Job() {
  return (
    <div className="m-10 py-3">
      <div className="md:flex md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-7">AI ChatBot</h1>
          <p className="font-medium">Hired by Abishek Thapa</p>
          <p className="font-normal mb-11">Bibash Thapa</p>
        </div>

        <div className="md:grid md:place-content-center">
          <div className="flex">
            <button className="bg-green-600 text-white p-1 m-1 rounded-md">
              Active
            </button>
            <p className="p-1 m-1">1hrs, $12.50 this week </p>
          </div>
          <p className="p-1">Rate:$12.50/hr, 40hrs weekly limit</p>
        </div>

        <div className="flex items-start space-x-2">
          <button className="bg-transparent p-2 text-green-600 border border-green-600 rounded-3xl ">
            See timesheet
          </button>
          <div className="border text-green-600 border-gray-300 p-3 rounded-full ">
            <MdMoreHoriz />
          </div>
        </div>
      </div>
      <p className="mb-3 p-2">Date feb-12</p>
      <div className="flex items-center border-t-2"></div>
    </div>
  );
}
