import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import http from "../../config/http";
import ProductContent from "./ProductContent";
import ServiceContent from "./ServiceContent";

const Tabs = ({
  // jobTitle,
  // filteredJobs,
  setCategory,
  productFilteredJobs,
  serviceFilteredJobs,
}) => {
  const [activeTab, setActiveTab] = useState("Product");
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

  // Function to fetch applied jobs
  const fetchSelfAppliedJobs = async () => {
    try {
      const response = await http.post("/freelancer/getSelfAppliedJobs", {
        userId,
      });
      const appliedJobIds = response?.data?.map((item) => item.job._id);
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCategory(tab);
  };

  // Filtering jobPosts based on the category product and service put product category in productJobs and service category in serviceJobs
  const productJobs = jobPosts.filter((job) => job.category === "Product");
  // setProductJobs(product);
  const serviceJobs = jobPosts.filter((job) => job.category === "Service");
  // setServiceJobs(service);

  console.log("appliedJobsId is", appliedJobsId);

  return (
    <div className="flex flex-col rounded-t-lg border-2 border-red-500">
      <div className="flex">
        <button
          className={`py-2 px-4 w-full rounded-tl-lg ${
            activeTab === "Product"
              ? "bg-green-500 text-white text-base font-bold"
              : "bg-gray-200 text-gray-700 text-base font-bold"
          }`}
          onClick={() => handleTabClick("Product")}
        >
          Product
        </button>
        <button
          className={`py-2 px-4 w-full rounded-tr-lg ${
            activeTab === "Service"
              ? "bg-green-500 text-white text-base font-bold"
              : "bg-gray-200 text-gray-700 text-base font-bold"
          }`}
          onClick={() => handleTabClick("Service")}
        >
          Service
        </button>
      </div>
      <div className="p-4 bg-gray-50 border-2 border-gray-200 h-screen overflow-auto">
        {activeTab === "Product" && (
          <ProductContent
            appliedJobsId={appliedJobsId}
            // filteredJobs={filteredJobs}
            productFilteredJobs={productFilteredJobs}
            productJobs={productJobs}
          />
        )}
        {activeTab === "Service" && (
          <ServiceContent
            appliedJobsId={appliedJobsId}
            serviceFilteredJobs={serviceFilteredJobs}
            // filteredJobs={filteredJobs}
            serviceJobs={serviceJobs}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;
