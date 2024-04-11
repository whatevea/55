import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import http from "../../config/http";
import ProductContent from "./ProductContent";
import ServiceContent from "./ServiceContent";
import { ScaleLoader } from "react-spinners";

const Tabs = ({ setCategory, category }) => {
  const [activeTab, setActiveTab] = useState("Product");
  const [categoryWiseJobs, setCategoryWiseJobs] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const userId = useSelector((state) => state?.User?.userData?._id);
  const [appliedJobsId, setAppliedJobsId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(4);
  const [searchText, setSearchText] = useState("");
  const contentRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchJobPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await http.get(
        `/hire/postJobByCategory?category=${category}&search=${searchText}`
      );
      const jobsObject = response?.data?.data.reduce((obj, job) => {
        obj[job._id] = job;
        return obj;
      }, {});
      setCategoryWiseJobs(jobsObject);
      setTotalPages(response?.data?.totalPages);
      setHasMore(response?.data?.totalPages > response?.data?.currentPage);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
    setLoading(false);
  }, [category]);

  const handleScroll = () => {
    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;
      const clientHeight = scrollContainer.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasMore &&
        !loading
      ) {
        console.log({ test: "i ok here " });
        fetchMoreJobs();
      }
    }
  };

  const fetchMoreJobs = async () => {
    setLoading(true);
    setIsLoadingMore(true);
    try {
      const response = await http.get(
        `/hire/postJobByCategory?page=${currentPage}&limit=${limit}&category=${category}&search=${searchText}`
      );
      const newData = response.data.data.reduce((obj, job) => {
        obj[job._id] = job;
        return obj;
      }, {});
      setCategoryWiseJobs((prevJobs) => ({ ...prevJobs, ...newData }));
      if (totalPages > currentPage) {
        setCurrentPage(currentPage + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more jobs:", error);
    }
    setLoading(false);
    setIsLoadingMore(false);
  };

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
    fetchJobPosts();
  }, [category]);

  const searchTextFunction = async (e) => {
    const text = e.target.value;
    setSearchText(text);
    setCurrentPage(1);
    try {
      // Make a request to the backend endpoint to filter jobs
      const response = await http.get(
        `/hire/postJobByCategory?search=${text}&page=${currentPage}&limit=${limit}&category=${category}`
      );
      setCategoryWiseJobs(response?.data?.data);
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCategory(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [hasMore, loading]);

  console.log("categoryWiseJobs is:", categoryWiseJobs);

  return (
    <div>
      <div className="group lg:border-2  border-2 border-solid border-gray-600 rounded-xl flex h-[35px] items-center mb-6 hover:text-green-600 focus-within:border-green-600">
        <i className="fa-solid fa-magnifying-glass text-green-600 mr-2 ml-2 scale-125"></i>
        <input
          className="outline-none bg-transparent p-1.5 hidden lg:flex w-full focus:shadow-green-100 focus:outline-none"
          type="text"
          placeholder="Search for jobs"
          onChange={searchTextFunction}
        />
      </div>
      <div className="flex flex-col rounded-t-lg">
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
        <div
          className="p-4 bg-gray-50 border-2 border-gray-200 h-screen overflow-auto product-service-content"
          ref={contentRef}
        >
          {activeTab === "Product" && (
            <ProductContent
              appliedJobsId={appliedJobsId}
              categoryWiseJobs={Object.values(categoryWiseJobs)}
            />
          )}
          {activeTab === "Service" && (
            <ServiceContent
              appliedJobsId={appliedJobsId}
              categoryWiseJobs={Object.values(categoryWiseJobs)}
            />
          )}
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <ScaleLoader color="#4caf50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
