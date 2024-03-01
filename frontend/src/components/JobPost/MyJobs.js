import React from "react";
import Job from "./Job";
import NoJobs from "./NoJobjs";

const jobs = [];

const MyJobs = () => {
  return (
    <div className="m-10 py-3">
      <div className="mb-12">
        <h1 className="md:text-5xl mb-3 text-3xl font-medium">My jobs</h1>
        <h3 className="md:text-xl text-lg font-medium flex">
          Earnings available now: <p className="text-green-600">$00.00</p>
        </h3>
      </div>

      <div className="text:xl md:text-3xl font-medium mb-7">
        <h1 className="">Active contracts</h1>
      </div>
      {jobs.length > 0 ? jobs.map((item) => <Job />) : <NoJobs />}
    </div>
  );
};

export default MyJobs;
