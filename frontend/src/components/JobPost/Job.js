import React from "react";
import { MdMoreHoriz } from "react-icons/md";

export default function Job({ job_id, hirer, job_state, job_title, wage, date }) {
    return (

        <div className="m-1 py-3 px-2 bg-green-50">
            <div className="md:flex md:justify-between">
                <div className="grid gap-1 mb-4">
                    <h1 className="md:text-2xl text-xl font-semibold mb-7">{job_title}</h1>
                    <p className="font-medium">Hirer: {hirer}</p>
                </div>

                <div className="md:grid md:place-content-center md:gap-0 mt-11 gap-3">
                    <div className="flex">
                        <button className="bg-green-600 text-white p-1 m-1 rounded-md">
                            {job_state}
                        </button>
                        <p className="p-1 m-1"></p>
                    </div>
                    <p className="p-1 ">Rate: {wage}</p>
                </div>

                <div className="flex items-start space-x-2 mt-2">

                    <div className="border text-green-600 border-gray-300 p-3 invisible md:visible rounded-full ">
                        <MdMoreHoriz />
                    </div>
                </div>
            </div>
            <p className="mb-3 mt-2">Date {date}</p>
            <div className="flex items-center border-t-2"></div>
        </div>
    );
}
