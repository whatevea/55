import React, { useEffect, useState } from "react";
import http from "../../config/http";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component"; // Import the component

function HirerJobList() {
  const userId = useSelector((state) => state?.User?.userData?._id);

  const [jobPosts, setJobPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobPosts = async () => {
    try {
      const response = await http.get(
        `/hire/postJobByHirerUserId/${userId}?page=${currentPage}&limit=5`
      );
      const { data, meta } = response.data;

      setJobPosts([...jobPosts, ...data]);
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(meta?.hasNext || false); // If we got 5 records, there might be more
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  useEffect(() => {
    fetchJobPosts(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="px-6">
      <div className="text-center text-3xl text-green-600 font-bold mt-4">
        <h1 className="text-2xl mx-auto">See your Posts:</h1>
      </div>
      <InfiniteScroll
        dataLength={jobPosts.length} // Pass the length of your data array
        next={fetchJobPosts} // Function to fetch more data
        hasMore={hasMore} // Flag indicating if there's more data to fetch
        loader={<ScaleLoader />} // Loading indicator component
        endMessage={
          <h4 className="text-center text-green-600 text-2xl font-semibold m-2">
            No More Posts
          </h4>
        } // Message shown when all data is loaded
      >
        {jobPosts.length > 0 ? (
          jobPosts.map((jobPost) => (
            <div
              className="bg-green-50  rounded-md shadow-sm overflow-hidden m-4 p-4 flex items-center justify-between"
              key={jobPost.id}
            >
              <div className="w-3/4">
                <div className="text-sm">
                  Posted: {moment(jobPost?.createdAt).fromNow()}
                </div>
                <h2 className="text-2xl font-medium mb-2">{jobPost?.title}</h2>
                <div className="mb-2">
                  {jobPost?.budgetType === "hourly" ? (
                    <div>
                      <span className="capitalize inline-block font-bold mx-1 text-sm">
                        {jobPost?.budgetType}
                      </span>
                      :{" "}
                      <span className="capitalize inline-block mx-1 font-bold text-sm">
                        ${jobPost?.budgetHourlyMin}
                      </span>
                      -
                      <span className="capitalize inline-block font-bold mx-1 text-sm">
                        ${jobPost?.budgetHourlyMax}
                      </span>
                      <span className="capitalize inline-block font-bold mx-1 text-sm">
                        Duration: {jobPost?.scopeDuration}
                      </span>
                      <span className="capitalize inline-block mx-1 font-bold text-sm">
                        Experience: {jobPost?.scopeExperience}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="capitalize inline-block mx-1 text-sm">
                        {jobPost?.budgetType}
                      </span>
                      <span className="capitalize inline-block mx-1 text-sm">
                        ${jobPost?.budgetFixed}
                      </span>
                      <span className="capitalize inline-block mx-1 text-sm">
                        Duration: {jobPost?.scopeDuration}
                      </span>
                      <span className="capitalize inline-block mx-1 text-sm">
                        Experience: {jobPost?.scopeExperience}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-gray-700 mb-4 break-words">
                  {jobPost?.description}
                </div>
              </div>
              <Link to={`/hirer/seeappliers/${jobPost._id}`}>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 rounded-md text-base font-medium text-center text-white bg-green-600 hover:bg-green-500 "
                >
                  See Applications For This Job
                </button>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="text-2xl mx-auto text-center text-green-600 py-6">
            You Have Not Posted Any Posts
          </h1>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default HirerJobList;
