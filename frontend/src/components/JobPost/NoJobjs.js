import React from "react";

export default function NoJobjs() {
  return (
    <div className="m-8 py-3">
      <div className="p-10 m-5 bg-gray-100 rounded-2xl">
        <div className="grid place-content-center gap-8">
          <p className="flex justify-center text-2xl font-semibold">
            There are no active contracts.
          </p>
          <p className="">
            Contracts you're actively working on will appear here.
          </p>
          <button className="bg-green-600 hover:bg-green-500 text-white p-2 px-5 rounded-3xl">
            Search for new projects
          </button>
        </div>
      </div>
    </div>
  );
}
