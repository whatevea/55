import React from 'react';
import { FaReact } from 'react-icons/fa'; // Example icon import
const JobPosting = ({job}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:bg-green-50">
      <div className="flex items-center justify-between">
        {/* Job Title */}
        <h1 className="text-lg font-bold text-green-600 hover:underline">Nextjs front-end developer to work on a project</h1>
      </div>
      <p className="text-sm my-4">
        {/* Job Description */}
        Hey there, Am looking for a front-end developer to work alongside me and a backend developer to create the next billion dollar startup. I will share the details with the selected candidate. Skills required: - Nextjs/Reactjs - Typescript & Tailwind css - Consuming apis data The budget is fixed for the front-end so dont apply if you aren't ready to work with my budget! In order to be considered for this job, please submit your resume/cv, github link and portfolio link. Looking forward to seeing your proposals and reviews When applying start your proposal with "Fund" to ensure that you read my description.
      </p>
      <div className="flex mt-4">
        {/* Tech stack required for jobs */}
        {/* Tags */}
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">JavaScript</span>
        {/* Repeat for other tags */}
      </div>
      <div className="flex items-center justify-between mt-4">       
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-600">Proposals: 5 to 10</p>
        
      </div>
    </div>
  );
};
export default JobPosting;

