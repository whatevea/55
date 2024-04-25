// import React, { useEffect, useState } from "react";
// import http from "../../config/http";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function HirerJobList() {
//   const userId = useSelector((state) => state?.User?.userData?._id);

//   const [jobPosts, setJobPosts] = useState([]);
//   let formattedCreatedAt;
//   useEffect(() => {
//     // Function to fetch job posts from the backend
//     const fetchJobPosts = async () => {
//       try {
//         // const hirerUserData = await http.get(`/auth/getUserData/${userId}`);
//         // console.log('hirerUserData is',hirerUserData);

//         const response = await http.get(`/hire/postJobByHirerUserId/${userId}`);
//         console.log("response.data.data is", response.data.data);
//         setJobPosts(response.data.data); // Assuming the response contains job posts data
//       } catch (error) {
//         console.error("Error fetching job posts:", error);
//       }
//     };

//     fetchJobPosts(); // Call the function when the component mounts
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   console.log("jobPosts is", jobPosts);

//   return (
//     <div className="px-6">
//       <div className="text-center text-3xl text-green-600 font-bold mt-4">
//         <h1 className="text-2xl mx-auto">See your Jobs:</h1>
//       </div>
//       {jobPosts.length > 0 ? (
//         jobPosts.map((jobPost) => (
//           <div
//             className="bg-green-50  rounded-md shadow-sm overflow-hidden m-4 p-4 flex items-center justify-between"
//             key={jobPost.id}
//           >
//             <div className="w-3/4">
//               <div className="text-sm">
//                 Posted:{" "}
//                 {(formattedCreatedAt = moment(jobPost?.createdAt).fromNow())}
//               </div>
//               <h2 className="text-2xl font-medium mb-2">{jobPost?.title}</h2>
//               <div className="mb-2">
//                 {jobPost?.budgetType === "hourly" ? (
//                   <div>
//                     <span className="capitalize inline-block font-bold mx-1 text-sm">
//                       {jobPost?.budgetType}
//                     </span>
//                     :{" "}
//                     <span className="capitalize inline-block mx-1 font-bold text-sm">
//                       ${jobPost?.budgetHourlyMin}
//                     </span>
//                     -
//                     <span className="capitalize inline-block font-bold mx-1 text-sm">
//                       ${jobPost?.budgetHourlyMax}
//                     </span>
//                     <span className="capitalize inline-block font-bold mx-1 text-sm">
//                       Duration: {jobPost?.scopeDuration}
//                     </span>
//                     <span className="capitalize inline-block mx-1 font-bold text-sm">
//                       Experience: {jobPost?.scopeExperience}
//                     </span>
//                   </div>
//                 ) : (
//                   <div>
//                     <span className="capitalize inline-block mx-1 text-sm">
//                       {jobPost?.budgetType}
//                     </span>
//                     <span className="capitalize inline-block mx-1 text-sm">
//                       ${jobPost?.budgetFixed}
//                     </span>
//                     <span className="capitalize inline-block mx-1 text-sm">
//                       Duration: {jobPost?.scopeDuration}
//                     </span>
//                     <span className="capitalize inline-block mx-1 text-sm">
//                       Experience: {jobPost?.scopeExperience}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <div className="text-gray-700 mb-4 break-words">
//                 {jobPost?.description}
//               </div>
//               {/* <div className="flex mt-4 mb-4">
//               {jobPost?.skills_required?.map((skill) => (
//                 <span
//                   key={skill}
//                   className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div> */}
//             </div>
//             <Link to={`/hirer/seeappliers/${jobPost._id}`}>
//               <button
//                 type="button"
//                 className="inline-flex items-center px-4 py-2 rounded-md text-base font-medium text-center text-white bg-green-600 hover:bg-green-500 "
//               >
//                 See Applications For This Job
//               </button>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <h1 className="text-2xl mx-auto text-center text-green-600 py-6">
//           You Have Not Posted Any Posts
//         </h1>
//       )}
//     </div>
//   );
// }

// export default HirerJobList;

import React, { useEffect, useState, useRef } from "react";
import http from "../../config/http";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";

function HirerJobList() {
  const userId = useSelector((state) => state?.User?.userData?._id);

  const [jobPosts, setJobPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  let formattedCreatedAt;

  const fetchJobPosts = async () => {
    try {
      const response = await http.get(
        `/hire/postJobByHirerUserId/${userId}?limit=5&offset=${offset}`
      );
      // const newJobPosts = response.data.data;
      const { data, meta } = response.data;
      setJobPosts([...jobPosts, ...data]);
      setOffset(offset + 5);
      setHasMore(meta.hasnext); // If we got 5 records, there might be more
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  useEffect(() => {
    // Function to fetch job posts from the backend
    fetchJobPosts(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleScroll = () => {
    console.log("we have scrolled");
    const scrollPosition =
      containerRef.current.scrollTop + containerRef.current.offsetHeight;
    const height = containerRef.current.scrollHeight;

    console.log("scrollPosition is", scrollPosition);
    console.log("hasMore is", hasMore);

    if (scrollPosition >= height && hasMore) {
      fetchJobPosts(); // Fetch the next chunk of data
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  console.log("jobPosts is", jobPosts);

  return (
    <div
      ref={containerRef}
      className="px-6 h-screen overflow-auto border-2 border-red-600"
    >
      <div className="text-center text-3xl text-green-600 font-bold mt-4">
        <h1 className="text-2xl mx-auto">See your Posts:</h1>
      </div>
      {jobPosts.length > 0 ? (
        jobPosts.map((jobPost) => (
          <div
            className="bg-green-50  rounded-md shadow-sm overflow-hidden m-4 p-4 flex items-center justify-between"
            key={jobPost.id}
          >
            <div className="w-3/4">
              <div className="text-sm">
                Posted:{" "}
                {(formattedCreatedAt = moment(jobPost?.createdAt).fromNow())}
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
    </div>
  );
}

export default HirerJobList;
