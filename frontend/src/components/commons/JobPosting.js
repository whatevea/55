import React, { memo } from "react";
const JobPosting = memo(({ job, hasApplied }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:bg-green-50">
      <div className="flex items-center justify-between">
        {/* Job Title */}
        <h1 className="text-2xl font-bold text-green-600 hover:underline mb-2">
          {job.title}
        </h1>
      </div>
      <div>
        {job.budgetType === "hourly" ? (
          <div>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              {job.budgetType}
            </span>
            :{" "}
            <span className="capitalize inline-block mx-1 font-bold text-base">
              ${job.budgetHourlyMin}
            </span>
            -
            <span className="capitalize inline-block mx-1 font-bold text-base">
              ${job.budgetHourlyMax}
            </span>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              Duration: {job.scopeDuration}
            </span>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              Experience: {job.scopeExperience}
            </span>
          </div>
        ) : (
          <div>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              {job.budgetType}
            </span>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              ${job.budgetFixed}
            </span>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              Duration: {job.scopeDuration}
            </span>
            <span className="capitalize inline-block mx-1 font-bold text-base">
              Experience: {job.scopeExperience}
            </span>
          </div>
        )}
      </div>
      <p className="text-sm my-4 break-words">{job.description}</p>
      <div className="flex items-center justify-between mt-4"></div>
      <div className="flex items-center justify-between mt-2">
        {hasApplied && (
          <p className="bg-red-500">You have already applied for this job</p>
        )}
      </div>
    </div>
  );
});
export default JobPosting;
