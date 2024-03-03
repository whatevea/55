import React, { useState, useEffect } from 'react';
import axios from 'axios';
import http from '../../config/http';
import JobPosting from './JobPosting';
import { Link } from 'react-router-dom';

const FullPageTabs = () => {
  const [jobPosts, setJobPosts] = useState([]);
  console.log('jobPosts is', jobPosts);

  useEffect(() => {
    // Function to fetch job posts from the backend
    const fetchJobPosts = async () => {
      try {
        const response = await http.get('/hire/postjob');
        setJobPosts(response.data.data); // Assuming the response contains job posts data
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="flex flex-col justify-between p-4 bg-green-600 text-white rounded-t-xl">
        <div className="text-2xl font-bold mb-2">Job Listings</div>
        <div>
          <p className='text-white text-sm'>Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.</p>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-50">
        {jobPosts.map(jobPost => (
          <Link to={`/job/${jobPost.id}`} key={jobPost._id}>
            <JobPosting job={jobPost} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FullPageTabs;
