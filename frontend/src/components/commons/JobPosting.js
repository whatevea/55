import React from 'react';
import { FaReact } from 'react-icons/fa'; // Example icon import
const JobPosting = ({ job }) => {
  const skills = job.skills_required
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:bg-green-50">
      <div className="flex items-center justify-between">
        {/* Job Title */}
        <h1 className="text-lg font-bold text-green-600 hover:underline">{job.title}</h1>
      </div>
      <div>
        {
          job.budgetType === 'hourly' ?
            (
              <div>
                <span className='capitalize inline-block mx-1 text-sm'>{job.budgetType}</span>: <span className='capitalize inline-block mx-1 text-sm'>${job.budgetHourlyMin}</span>-<span className='capitalize inline-block mx-1 text-sm'>${job.budgetHourlyMax}</span>
                <span className='capitalize inline-block mx-1 text-sm'>Duration: {job.scopeDuration}</span>
                <span className='capitalize inline-block mx-1 text-sm'>Experience: {job.scopeExperience}</span>
              </div>)
            :
            (
              <div>
                <span className='capitalize inline-block mx-1 text-sm'>{job.budgetType}</span>
                <span className='capitalize inline-block mx-1 text-sm'>${job.budgetFixed}</span>
                <span className='capitalize inline-block mx-1 text-sm'>Duration: {job.scopeDuration}</span>
                <span className='capitalize inline-block mx-1 text-sm'>Experience: {job.scopeExperience}</span>
              </div>
            )
        }

      </div>
      <p className="text-sm my-4 break-words">
        {job.description}
      </p>
      <div className="flex flex-col gap-2 md:flex-row mt-4 ">
        {skills.map((skill) => (
          <span key={skill} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {skill}
          </span>
        ))}
        {/* <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">JavaScript</span> */}

      </div>
      <div className="flex items-center justify-between mt-4">
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-600"></p>
      </div>
    </div>
  );
};
export default JobPosting;

