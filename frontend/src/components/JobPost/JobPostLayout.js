import React, { useState } from "react";
import Title from "./Title";
import Skill from "./Skill";
import Scope from "./Scope";
import Budget from "./Budget";
import Description from "./Description";
import http from "../../config/http";
import JobPosted from "./JobPosted";


const JobPostLayout = () => {
    const [jobData, setJobData] = useState({ provider: "65e1967022146dc8e878fb56" })
    const [currentTab, setTab] = useState(1);
    const [isValid, setIsValid] = useState(false);
    const updateJobData = (jobObject) => {
        setJobData(prevState => ({
            ...prevState,
            ...jobObject
        }));
    }
    const increaseTab = async () => {
        if (currentTab === 5) {
            let res = await http.post("/hire/postJob", jobData)
            if (res.status === 200 || res.status === 201) {
            }
            else {
                return
            }

        }
        setTab(currentTab + 1)
    }

    const orders = {
        1: {
            name: "Title",
            component: Title,
            title: "Let's start with a Strong Title",
            description: "This helps your job post stand out to the right candidates. It's the first thing they'll see, so make it count!"
        },
        2: {
            name: "Skill",
            component: Skill,
            title: "What are the main skills required for your work?",
            description: ""
        },
        3: {
            name: "Scope",
            component: Scope,
            title: "Next, estimate the scope of your work.",
            description: "Consider the size of your project and the time it will take."
        },
        4: {
            name: "Budget",
            component: Budget,
            title: "Tell us about your budget.",
            description: "This will help us match you to talent within your range."
        },
        5: {
            name: "Description",
            component: Description,
            title: "Explain your Task",
            description: "Clear expectations about you task or deliverables, The skills required for the work, Good communication"
        },
        6: {
            name: "Post Job",
            component: JobPosted,
            title: "Congratulations",
            description: ""
        },
        7: {
            name: "Go to Home"
        }
    };

    const Component = orders[currentTab].component;

    return (
        <div className="flex flex-col gap-10">
            <div className="p-4 w-full flex flex-col sm:flex-row ">
                <div className="firsthalf p-2 sm:w-1/2">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-600">{currentTab}/5 <span className="ml-4"> Job Post</span></p>
                        <p className="text-3xl">{orders[currentTab].title}</p>
                        <p className="break-words">{orders[currentTab].description}</p>

                    </div>
                </div>
                <div className="secondhalf p-2 sm:w-1/2">
                    <Component setIsValid={setIsValid} updateJobData={updateJobData} />
                </div>
            </div>

            <p className="hidden"></p>
            <div className="progressbar w-full h-1 rounded-md bg-neutral-400">
                <div className={`h-full greenbar w-${currentTab}/5 rounded-md bg-green-700 `}></div>
            </div>
            {/* <p className="w-1/5 w-2/5 w-3/5 w-4/5 w-5/5"></p> */}
            <div className="nextbtn  w-full p-2">
                {
                    currentTab > 1 && (<button onClick={() => setTab(currentTab - 1)} className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-2xl px-6 py-3 border disabled:bg-[#e4ebe4] bg-green-700  font-semibold`} > Back  </button>)
                }
                <button disabled={!isValid} onClick={increaseTab} className={`disabled:cursor-not-allowed disabled:text-[#9aaa97] text-white  rounded-2xl px-6 py-3 border disabled:bg-[#e4ebe4] float-right bg-green-700  font-semibold`} > Next :{orders[currentTab + 1].name}  </button>
            </div>
        </div>
    );
};

export default JobPostLayout;
