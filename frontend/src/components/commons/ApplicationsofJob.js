import React, { useEffect, useState } from 'react';
import http from "../../config/http";
import { useParams } from 'react-router-dom';

export default function ApplicationsOfJob() {
    const { job_id } = useParams();

    console.log('job_id is', job_id);

    const [jobData, setData] = useState(null);
    const [applierData, setApplierData] = useState(null)

    console.log('jobData is', jobData);
    console.log('applierData is', applierData)

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch the main data using job_id
                const req = await http.get(`/hire/singleJobPost/${job_id}`);

                if (req.data && req.data.data) {
                    setData(req.data.data);

                    // Once the main data is fetched, make another API call using some data from the first response
                    const anotherReq = await http.get(`/hire/getappliers/${job_id}`);
                    setApplierData(anotherReq.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Handle errors or set some error state to show a message
            }
        }

        fetchData();
    }, [job_id]); // Depend on job_id so if it changes, re-fetch data


    return (
        <div className='w-[90%] mx-auto'>
            <div className="bg-green-50 shadow-md rounded-md overflow-hidden mt-4">
                <div>
                    <div className='text-left mt-2 mx-4'>
                        <h1 className='text-3xl text-green-600 font-bold'>Job Details</h1>
                    </div>
                    <div className="flex items-center p-4 border-b border-gray-200">
                        <div>
                            <h3 className="text-2xl font-medium text-black">
                                {jobData?.title}
                            </h3>
                            <div className="text-base text-black">
                                <div>
                                    {
                                        jobData?.budgetType === 'hourly' ?
                                            (
                                                <div>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobData?.budgetType}</span>: <span className='capitalize inline-block font-bold mx-1 text-sm'>${jobData?.budgetHourlyMin}</span>-<span className='capitalize inline-block font-bold mx-1 text-sm'>${jobData?.budgetHourlyMax}</span>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobData?.scopeDuration}</span>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>Experience: {jobData?.scopeExperience}</span>
                                                </div>)
                                            :
                                            (
                                                <div>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobData?.budgetType}</span>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>${jobData?.budgetFixed}</span>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobData?.scopeDuration}</span>
                                                    <span className='capitalize inline-block font-bold mx-1 text-sm'>Experience: {jobData?.scopeExperience}</span>
                                                </div>
                                            )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="text-base font-medium text-black">Job Description</h4>
                        <p className="text-sm text-black mt-2">
                            {jobData?.description}
                        </p>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <h4 className="text-base font-medium text-black">Skills Required</h4>
                        <ul className="flex flex-wrap mt-2">
                            {
                                jobData?.skills_required.map((item) => (
                                    <li className="m-1 px-2 py-1 rounded-full bg-green-200 text-black text-sm font-semibold" key={item}>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="p-4 flex flex-col w-full">
                    <h1 className='text-3xl font-bold mt-4 text-green-600 mb-4 mx-auto'>Jop Applicants</h1>
                    {
                        applierData && applierData.length > 0 ? (
                            applierData.map((applier, index) => (
                                <div key={applier._id}>
                                    <div className="bg-gray-200 border border-gray-300 shadow-lg rounded-md p-6 max-w-xl mx-auto mt-8">
                                        <h2 className="text-2xl font-semibold text-green-700 mb-4">Applicant Information {index+1}</h2>
                                        <div className="flex flex-col space-y-4">
                                            <div>
                                                <label className="text-gray-600">Attachment Url:</label>
                                                <p className="text-green-700">{applier.attachment_url}</p>
                                            </div>
                                            <div>
                                                <label className="text-gray-600">Cover Letter:</label>
                                                <p className="text-green-700">{applier.cover_letter}</p>
                                            </div>
                                            <div>
                                                <label className="text-gray-600">Offered Amount:</label>
                                                <p className="text-green-700">${applier.offered_amount}</p>
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <button className='rounded-md text-white bg-green-600 px-3 py-1.5 text-base font-semibold'>Contact Applicant</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<h1 className='text-3xl font-bold'>No Appliers for this job</h1>)
                    }
                </div>
            </div>
        </div>
    );
}
