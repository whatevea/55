import React, { useEffect, useState } from "react";
import Job from "./Job";
import NoJobs from "./NoJobjs";
import { useSelector } from "react-redux";
import http from '../../config/http';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]); // Moved inside the component
    const userId = useSelector((state) => state?.User?.userData?._id); // Make sure the path matches your state structure

    useEffect(() => {
        const fetchSelfAppliedJobs = async () => {
            try {
                const response = await http.post('/freelancer/getSelfAppliedJobs', { userId: userId });
                console.log('response.data is', response.data);

                const items = await Promise.all(response.data.map(async (item) => {
                    const thisJobUserData = await http.get(`/auth/getUserData/${item.job.provider}`);
                    console.log('thisJobUserData.data.data.fname', thisJobUserData.data.data.fname);
                    console.log('thisJobUserData.data.data.lname', thisJobUserData.data.data.lname);

                    return {
                        job_id: item.job._id,
                        job_title: item.job.title,
                        hirer: `${thisJobUserData.data.data.fname.toUpperCase()} ${thisJobUserData.data.data.lname.toUpperCase()}`,
                        job_state: "Pending",
                        wage: item.offered_amount,
                        date: item.createdAt,
                        budgetType: item.job.budgetType,
                    };
                }));

                setJobs(items);
                console.log('items is', items);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };
        fetchSelfAppliedJobs();
    }, [userId]); // Added userId as a dependency to useEffect

    return (
        <div className="m-10">
            <div className="mb-12">
                <h1 className="md:text-3xl mb-3 text-xl font-medium">My jobs</h1>
                <h3 className="md:text-xl text-lg font-medium flex">
                    Earnings available now: <p className="text-green-600">$00.00</p>
                </h3>
            </div>

            <div className="text-xl md:text-3xl text-green-600 font-medium mb-7">
                Submitted Proposal:
            </div>
            {jobs.length > 0 ? jobs.map((item) => <Job key={item.job_id} {...item} budgetType={item.budgetType} />) : <NoJobs />}
        </div>
    );
};

export default MyJobs;
