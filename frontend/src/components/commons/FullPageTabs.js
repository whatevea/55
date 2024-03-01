import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPosting from './JobPosting';
import { Link } from 'react-router-dom';

const FullPageTabs = () => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    // Function to fetch job posts from the backend
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
        setJobPosts(response.data); // Assuming the response contains job posts data
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-between p-4 bg-green-600 text-white rounded-t-xl">
        <div className="text-2xl font-bold mb-2">Job Listings</div>
        <div>
          <p className='text-white text-sm'>Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.</p>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-50">
        <JobPosting />
        {/* Render job postings
        {jobPosts.map(jobPost => (
          <Link to={`/job/${jobPost.id}`} key={jobPost.id}>
            <JobPosting job={jobPost} />
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default FullPageTabs;
