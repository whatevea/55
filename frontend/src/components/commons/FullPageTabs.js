import React, { useState, useEffect, useMemo, useCallback } from "react";
import http from "../../config/http";
import JobPosting from "./JobPosting";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const renderJobPosting = (job, hasApplied) => (
  <div key={job._id}>
    {hasApplied ? (
      <a
        href="#"
        className="cursor-not-allowed"
        onClick={(e) => e.preventDefault()}
      >
        <JobPosting job={job} hasApplied />
      </a>
    ) : (
      <Link to={`/freelancer/apply/${job._id}`}>
        <JobPosting job={job} />
      </Link>
    )}
  </div>
);

const FullPageTabs = ({ jobTitle, filteredJobs }) => {
  const [jobPosts, setJobPosts] = useState([]);
  const userId = useSelector((state) => state?.User?.userData?._id); // Make sure the path matches your state structure
  const [appliedJobsId, setAppliedJobsId] = useState([]);

  // Function to fetch job posts from the backend
  const fetchJobPosts = useCallback(async () => {
    try {
      const response = await http.get("/hire/postjob");
      setJobPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  }, []);

  const fetchSelfAppliedJobs = async () => {
    try {
      const response = await http.post("/freelancer/getSelfAppliedJobs", {
        userId,
      });
      const appliedJobIds = response.data.map((item) => item.job._id);
      setAppliedJobsId(appliedJobIds);
    } catch (error) {
      console.error("Error fetching applied job IDs:", error);
    }
  };

  useEffect(() => {
    fetchSelfAppliedJobs();
    fetchJobPosts(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  console.log("jobPosts is", jobPosts);

  return (
    <div className="flex flex-col h-screen overflow-auto border-2 border-yellow-500">
      <div className="flex flex-col justify-between p-4 bg-green-600 text-white rounded-t-xl">
        <div className="text-2xl font-bold mb-2">Job Listings</div>
        <div>
          <p className="text-white text-sm">
            Browse jobs that match your experience to a client's hiring
            preferences. Ordered by most relevant.
          </p>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-50">
        {filteredJobs.length > 0
          ? filteredJobs?.map((job) =>
              renderJobPosting(job, appliedJobsId.includes(job._id))
            )
          : jobPosts?.map((job) =>
              renderJobPosting(job, appliedJobsId.includes(job._id))
            )}
      </div>
    </div>
  );
};

export default FullPageTabs;
