import React from "react";

export default function NoJobjs() {
  return (
    <div className="md:m-8 m-3 py-0 md:py-3">
      <div className="md:p-10 md:m-5 p-6 m-3 grid md:gap-8 bg-gray-100 rounded-2xl">
        <div className="grid place-content-center">
          <p className="flex justify-center text-sm sm:text-base md:text-2xl font-semibold">
            There are no active contracts.
          </p>
        </div>

        <div className="grid place-content-center md:p-4 p-2">
          <button className="bg-green-600  hover:bg-green-500 text-white md:p-3 p-1 w-full text-xs md:text-base rounded-3xl">
            Search for new projects
          </button>
        </div>
      </div>
    </div>
  );
}
