import React from "react";

export default function NoJobjs() {
  return (
    <div className="md:m-8 md:py-3">
      <div className="md:p-10 md:m-5 p-6 m-3 bg-gray-100 rounded-2xl">
        <div className="grid place-content-center gap-8">
          <p className="flex justify-center text-sm sm:text-base md:text-2xl font-semibold">
            There are no active contracts.
          </p>
          <p className="text-xs md:text-base">
            Contracts you're actively working on will appear here.
          </p>
        </div>

        <div className="grid place-content-center md:p-4 p-3">
          <button className="bg-green-600  hover:bg-green-500 text-white md:p-3 p-1 text-xs md:text-base rounded-3xl">
            Search for new projects
          </button>
        </div>
      </div>
    </div>
  );
}
