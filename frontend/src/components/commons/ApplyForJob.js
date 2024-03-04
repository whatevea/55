import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../config/http';

const ApplyForJob = () => {
  const params = useParams()

  const [jobPost, setJobPost] = useState([]);

  useEffect(() => {
    // Function to fetch job posts from the backend
    const fetchJobPost = async () => {
      try {
        const response = await http.get(`/hire/singleJobPost/${params.id}`);
        setJobPost(response.data.data); // Assuming the response contains job posts data
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPost(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="rounded-lg shadow-md p-4 w-3/4 mx-auto h-[fit-content] mt-4 bg-green-50">
      <h2 className="text-2xl font-medium mb-2">{jobPost.title}
      </h2>
      <p className="text-gray-700 mb-4 break-words">
        {jobPost.description}        
      </p>
      <button className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500">        
        Apply Now       
      </button>
    </div>
  );
};

export default ApplyForJob;