// import React, { useState } from "react";
// import Title from "./Title";
// import Skill from "./Skill";
// import Scope from "./Scope";
// import Budget from "./Budget";
// import Description from "./Description";
// import http from "../../config/http";
// import JobPosted from "./JobPosted";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const JobPostLayout = () => {
//   const userData = useSelector((state) => state.User);

//   const navigate = useNavigate();
//   const [jobData, setJobData] = useState({
//     provider: userData.userData._id.toString(),
//   });
//   const [currentTab, setTab] = useState(1);
//   const [isValid, setIsValid] = useState(false);

//   const updateJobData = (jobObject) => {
//     setJobData((prevState) => ({
//       ...prevState,
//       ...jobObject,
//     }));
//   };

//   console.log("jobData:", jobData);

//   const increaseTab = async () => {
//     if (currentTab === 6) {
//       navigate("/");
//     }
//     if (currentTab === 5) {
//       let res = await http.post("/hire/postJob", jobData);
//       if (res.status === 200 || res.status === 201) {
//       } else {
//         console.log("error occured");
//       }
//     }
//     setTab(currentTab + 1);
//   };

//   const orders = {
//     1: {
//       name: "Title",
//       component: Title,
//       title: "Let's start with Product or Service and Strong Title",
//       description:
//         "This helps your product or service to stand out to the right candidates. It's the first thing they'll see, so make it count!",
//     },
//     // 2: {
//     //   name: "Skill",
//     //   component: Skill,
//     //   title:
//     //     "For which University and Class you are providing product or services?",
//     //   description: "",
//     // },
//     2: {
//       name: "Scope",
//       component: Scope,
//       title: "Estimate the duration of your services.",
//       description:
//         "Consider the size of your Services and the time it will take.",
//     },
//     3: {
//       name: "Budget",
//       component: Budget,
//       title: "Tell us about your Rate.",
//       description: "This will help us get you a suitable cleint for your ask.",
//     },
//     4: {
//       name: "Description",
//       component: Description,
//       title: "Explain your Task",
//       description:
//         "Clear expectations about you task or deliverables, The skills required for the work, Good communication",
//     },
//     5: {
//       name: "Post Job",
//       component: JobPosted,
//       title: "Congratulations",
//       description: "",
//     },
//     6: {
//       name: "Go to Home",
//     },
//   };

//   const Component = orders[currentTab].component;

//   return (
//     <div className="flex flex-col gap-10 border-2 border-blue-500">
//       <div className="p-4 w-full flex flex-col md:flex-row gap-4">
//         <div className="firsthalf p-2 w-1/2">
//           <div className="flex flex-col gap-4">
//             <p className="text-green-600 text-xl font-bold">
//               {currentTab}/6{" "}
//               <span className="ml-4"> Product or Service Post</span>
//             </p>
//             <p className="text-xl md:text-3xl">{orders[currentTab].title}</p>
//             <p className="break-words">{orders[currentTab].description}</p>
//           </div>
//         </div>
//         <div className="secondhalf p-2 w-1/2">
//           <Component setIsValid={setIsValid} updateJobData={updateJobData} />
//         </div>
//       </div>

//       <p className="hidden"></p>
//       <div className="progressbar w-full h-1 rounded-md bg-neutral-400">
//         <div
//           className={`h-full greenbar w-${currentTab}/6 rounded-md bg-green-700 `}
//         ></div>
//       </div>
//       {/* <p className="w-1/6 w-2/6 w-3/6 w-4/6 w-5/6"></p> */}
//       <div className="nextbtn w-full flex flex-col gap-4 md:flex-row md:justify-between p-2 border-2 border-pink-400">
//         {currentTab > 1 && (
//           <button
//             onClick={() => setTab(currentTab - 1)}
//             className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//           >
//             {" "}
//             Back{" "}
//           </button>
//         )}
//         <button
//           disabled={!isValid}
//           onClick={increaseTab}
//           className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//         >
//           {" "}
//           Next :{orders[currentTab + 1].name}{" "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPostLayout;

// if product is selected, don't show the scope component, otherwise show the scope component

// import React, { useState } from "react";
// import Title from "./Title";
// import Scope from "./Scope";
// import Budget from "./Budget";
// import Description from "./Description";
// import http from "../../config/http";
// import JobPosted from "./JobPosted";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const JobPostLayout = () => {
//   const userData = useSelector((state) => state.User);

//   const navigate = useNavigate();
//   const [jobData, setJobData] = useState({
//     provider: userData.userData._id.toString(),
//   });
//   const [currentTab, setTab] = useState(1);
//   const [isValid, setIsValid] = useState(false);

//   const updateJobData = (jobObject) => {
//     setJobData((prevState) => ({
//       ...prevState,
//       ...jobObject,
//     }));
//   };

//   console.log("jobData:", jobData);

//   const increaseTab = async () => {
//     if (currentTab === 5) {
//       navigate("/");
//     }
//     if (currentTab === 4) {
//       let res = await http.post("/hire/postJob", jobData);
//       if (res.status === 200 || res.status === 201) {
//       } else {
//         console.log("error occured");
//       }
//     }
//     setTab(currentTab + 1);
//   };

//   const orders = {
//     1: {
//       name: "Title",
//       component: Title,
//       title: "Let's start with Product or Service and Strong Title",
//       description:
//         "This helps your product or service to stand out to the right candidates. It's the first thing they'll see, so make it count!",
//     },
//     2: {
//       name: "Scope",
//       component: Scope,
//       title: "Estimate the duration of your services.",
//       description:
//         "Consider the size of your Services and the time it will take.",
//     },
//     3: {
//       name: "Budget",
//       component: Budget,
//       title: "Tell us about your ask Price.",
//       description: "This will help us get you a suitable client for your ask.",
//     },
//     4: {
//       name: "Description",
//       component: Description,
//       title: "Explain your Product or Service",
//       description: "Detailed description about your Product or Service",
//     },
//     5: {
//       name: "Post Job",
//       component: JobPosted,
//       title: "Congratulations",
//       description: "",
//     },
//     6: {
//       name: "Go to Home",
//     },
//   };

//   const Component = orders[currentTab].component;

//   return (
//     <div className="flex flex-col gap-10 border-2 border-blue-500">
//       <div className="p-4 w-full flex flex-col md:flex-row gap-4">
//         <div className="firsthalf p-2 w-1/2">
//           <div className="flex flex-col gap-4">
//             <p className="text-green-600 text-xl font-bold">
//               {currentTab}/5{" "}
//               <span className="ml-4"> Product or Service Post</span>
//             </p>
//             <p className="text-xl md:text-3xl">{orders[currentTab].title}</p>
//             <p className="break-words">{orders[currentTab].description}</p>
//           </div>
//         </div>
//         <div className="secondhalf p-2 w-1/2">
//           <Component
//             setIsValid={setIsValid}
//             updateJobData={updateJobData}
//             jobData={jobData}
//           />
//         </div>
//       </div>

//       <p className="hidden"></p>
//       <div className="progressbar w-full h-1 rounded-md bg-neutral-400">
//         <div
//           className={`h-full greenbar w-${currentTab}/6 rounded-md bg-green-700 `}
//         ></div>
//       </div>
//       {/* <p className="w-1/6 w-2/6 w-3/6 w-4/6 w-5/6"></p> */}
//       <div className="nextbtn w-full flex flex-col gap-4 md:flex-row md:justify-between p-2 border-2 border-pink-400">
//         {currentTab > 1 && (
//           <button
//             onClick={() => setTab(currentTab - 1)}
//             className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//           >
//             {" "}
//             Back{" "}
//           </button>
//         )}
//         <button
//           disabled={!isValid}
//           onClick={increaseTab}
//           className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//         >
//           {" "}
//           Next :{orders[currentTab + 1].name}{" "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPostLayout;

// import React, { useState } from "react";
// import Title from "./Title";
// import Scope from "./Scope";
// import Budget from "./Budget";
// import Description from "./Description";
// import http from "../../config/http";
// import JobPosted from "./JobPosted";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const JobPostLayout = () => {
//   const userData = useSelector((state) => state.User);

//   const navigate = useNavigate();
//   const [jobData, setJobData] = useState({
//     provider: userData.userData._id.toString(),
//   });
//   const [currentTab, setTab] = useState(1);
//   const [isValid, setIsValid] = useState(false);

//   const updateJobData = (jobObject) => {
//     setJobData((prevState) => ({
//       ...prevState,
//       ...jobObject,
//     }));
//   };

//   console.log("jobData:", jobData);

//   const increaseTab = async () => {
//     if (currentTab === 5) {
//       navigate("/");
//     }
//     if (currentTab === 4) {
//       let res = await http.post("/hire/postJob", jobData);
//       if (res.status === 200 || res.status === 201) {
//       } else {
//         console.log("error occured");
//       }
//     }
//     setTab(currentTab + 1);
//   };

//   const orders = {
//     1: {
//       name: "Title",
//       component: Title,
//       title: "Let's start with Product or Service and Strong Title",
//       description:
//         "This helps your product or service to stand out to the right candidates. It's the first thing they'll see, so make it count!",
//     },
//     2: {
//       name: "Scope",
//       component: Scope,
//       title: "Estimate the duration of your services.",
//       description:
//         "Consider the size of your Services and the time it will take.",
//     },
//     3: {
//       name: "Budget",
//       component: Budget,
//       title: "Tell us about your ask Price.",
//       description: "This will help us get you a suitable client for your ask.",
//     },
//     4: {
//       name: "Description",
//       component: Description,
//       title: "Explain your Product or Service",
//       description: "Detailed description about your Product or Service",
//     },
//     5: {
//       name: "Post Job",
//       component: JobPosted,
//       title: "Congratulations",
//       description: "",
//     },
//     6: {
//       name: "Go to Home",
//     },
//   };

//   const Component = orders[currentTab].component;

//   return (
//     <div className="flex flex-col gap-10 border-2 border-blue-500">
//       <div className="p-4 w-full flex flex-col md:flex-row gap-4">
//         <div className="firsthalf p-2 w-1/2">
//           <div className="flex flex-col gap-4">
//             <p className="text-green-600 text-xl font-bold">
//               {currentTab}/5{" "}
//               <span className="ml-4"> Product or Service Post</span>
//             </p>
//             <p className="text-xl md:text-3xl">{orders[currentTab].title}</p>
//             <p className="break-words">{orders[currentTab].description}</p>
//           </div>
//         </div>
//         <div className="secondhalf p-2 w-1/2">
//           <Component
//             setIsValid={setIsValid}
//             updateJobData={updateJobData}
//             jobData={jobData}
//           />
//         </div>
//       </div>

//       <p className="hidden"></p>
//       <div className="progressbar w-full h-1 rounded-md bg-neutral-400">
//         <div
//           className={`h-full greenbar w-${currentTab}/6 rounded-md bg-green-700 `}
//         ></div>
//       </div>
//       {/* <p className="w-1/6 w-2/6 w-3/6 w-4/6 w-5/6"></p> */}
//       <div className="nextbtn w-full flex flex-col gap-4 md:flex-row md:justify-between p-2 border-2 border-pink-400">
//         {currentTab > 1 && (
//           <button
//             onClick={() => setTab(currentTab - 1)}
//             className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//           >
//             {" "}
//             Back{" "}
//           </button>
//         )}
//         <button
//           disabled={!isValid}
//           onClick={increaseTab}
//           className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
//         >
//           {" "}
//           Next :{orders[currentTab + 1].name}{" "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPostLayout;

import React, { useEffect, useState } from "react";
import Title from "./Title";
import Scope from "./Scope";
import Budget from "./Budget";
import Description from "./Description";
import http from "../../config/http";
import JobPosted from "./JobPosted";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobPostLayout = () => {
  const userData = useSelector((state) => state.User);

  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    provider: userData.userData._id.toString(),
  });
  const [currentTab, setTab] = useState(1);
  const [isValid, setIsValid] = useState(false);

  const updateJobData = (jobObject) => {
    setJobData((prevState) => ({
      ...prevState,
      ...jobObject,
    }));
  };

  console.log("Outside currentTab is", currentTab);

  const increaseTab = async () => {
    // Product handling logic
    if (jobData?.selectedOption === "Product") {
      console.log("Inside currentTab is", currentTab);

      if (currentTab === 4) {
        navigate("/");
      }
      if (currentTab === 3) {
        let res = await http.post("/hire/postJob", jobData);
        console.log("product post happened");
        if (res.status === 200 || res.status === 201) {
        } else {
          console.log("error occured");
        }
      }
      setTab(currentTab + 1);
    }

    // Service handling logic
    if (jobData?.selectedOption === "Service") {
      if (currentTab === 5) {
        navigate("/");
      }
      if (currentTab === 4) {
        let res = await http.post("/hire/postJob", jobData);
        console.log("res is", res);
        console.log("service post happened");
        if (res.status === 200 || res.status === 201) {
        } else {
          console.log("error occured");
        }
      }
      setTab(currentTab + 1);
    }

    // if (jobData.selectedOption === "Product" && currentTab === 4) {
    //   navigate("/");
    // } else if (jobData.selectedOption === "Service" && currentTab === 6) {
    //   navigate("/");
    // }

    // const postCall = jobData.selectedOption === "Product" ? 4 : 5;

    // console.log("postCall is", postCall);

    // if (currentTab === postCall) {
    //   console.log("we are inside postCall");

    //   let res = await http.post("/hire/postJob", jobData);
    //   if (res.status === 200 || res.status === 201) {
    //   } else {
    //     console.log("error occured");
    //   }
    // }
    // setTab(currentTab + 1);
  };

  const ProductsOrder = {
    1: {
      name: "Title",
      component: Title,
      title: "Let's start with Product and Strong Title",
      description:
        "This helps your product to stand out to the right candidates. It's the first thing they'll see, so make it count!",
    },
    2: {
      name: "Budget",
      component: Budget,
      title: "Tell us about your ask Price.",
      description: "This will help us get you a suitable client for your ask.",
    },
    3: {
      name: "Description",
      component: Description,
      title: "Explain your Product",
      description: "Detailed description about your Product",
    },
    4: {
      name: "Post Job",
      component: JobPosted,
      title: "Congratulations",
      description: "",
    },
    5: {
      name: "Go to Home",
    },
  };

  const ServiceOrder = {
    1: {
      name: "Title",
      component: Title,
      title: "Let's start with Service and Strong Title",
      description:
        "This helps your service to stand out to the right candidates. It's the first thing they'll see, so make it count!",
    },
    2: {
      name: "Scope",
      component: Scope,
      title: "Estimate the duration of your services.",
      description:
        "Consider the size of your Services and the time it will take.",
    },
    3: {
      name: "Budget",
      component: Budget,
      title: "Tell us about your ask Price.",
      description: "This will help us get you a suitable client for your ask.",
    },
    4: {
      name: "Description",
      component: Description,
      title: "Explain your Service",
      description: "Detailed description about your Service",
    },
    5: {
      name: "Post Job",
      component: JobPosted,
      title: "Congratulations",
      description: "",
    },
    6: {
      name: "Go to Home",
    },
  };

  const [orders, setOrders] = useState({});

  useEffect(() => {
    // Check if jobData.selectedOption is undefined or has a value other than "Products"

    if (jobData.selectedOption === "Product") {
      setOrders(ProductsOrder);
    } else {
      setOrders(ServiceOrder);
    }
  }, [jobData]);

  const Component = orders[currentTab]?.component;

  return (
    <div className="flex flex-col gap-10 border-2 border-blue-500">
      <div className="p-4 w-full flex flex-col md:flex-row gap-4">
        <div className="firsthalf p-2 w-1/2">
          <div className="flex flex-col gap-4">
            <p className="text-green-600 text-xl font-bold">
              {currentTab}/{jobData.selectedOption === "Product" ? 5 : 6}{" "}
              <span className="ml-4"> Product or Service Post</span>
            </p>
            <p className="text-xl md:text-3xl">{orders[currentTab]?.title}</p>
            <p className="break-words">{orders[currentTab]?.description}</p>
          </div>
        </div>
        <div className="secondhalf p-2 w-1/2">
          {Component && (
            <Component
              setIsValid={setIsValid}
              updateJobData={updateJobData}
              jobData={jobData}
            />
          )}
        </div>
      </div>

      <p className="hidden"></p>
      <div className="progressbar w-full h-1 rounded-md bg-neutral-400">
        <div
          className={`h-full greenbar w-${currentTab}/${
            jobData.selectedOption === "Product" ? 5 : 6
          } rounded-md bg-green-700 `}
        ></div>
      </div>
      {/* <p className="w-1/6 w-2/6 w-3/6 w-4/6 w-5/6 w-6/6"></p> */}
      {/* <p className="w-1/5 w-2/5 w-3/5 w-4/5 w-5/5"></p> */}

      <div className="nextbtn w-full flex flex-col gap-4 md:flex-row md:justify-between p-2 border-2 border-pink-400">
        {currentTab > 1 && (
          <button
            onClick={() => setTab(currentTab - 1)}
            className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
          >
            {" "}
            Back{" "}
          </button>
        )}
        <button
          disabled={!isValid}
          onClick={increaseTab}
          className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white rounded-md bg-green-600 hover:bg-green-500 px-3 py-1.5 border disabled:bg-[#e4ebe4] font-semibold`}
        >
          {" "}
          Next :{orders[currentTab + 1]?.name}{" "}
        </button>
      </div>
    </div>
  );
};

export default JobPostLayout;
