import React, { useEffect, useState } from 'react';
import http from "../../config/http";
import { useNavigate, useParams } from 'react-router-dom';
import Accordion from './AccordionComp';

export default function ApplicationsOfJob() {
    const { job_id } = useParams();

    const navigate = useNavigate()


    const [jobData, setData] = useState(null);
    const [applierData, setApplierData] = useState(null)
    const [userData, setUserData] = useState([]);
    

    const fetchUserData = async (userId) => {
        try {
            const response = await http.get(`/auth/getUserData/${userId}`);

            const userData = response?.data?.data; // Adjust this based on your server response structure
            setUserData((prevData) => ({
                ...prevData,
                [userId]: userData,
            }));
        } catch (error) {
            console.error(`Failed to fetch user data for ${userId}:`, error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the main data using job_id
                const [mainData, applierData] = await Promise.all([
                    http.get(`/hire/singleJobPost/${job_id}`),
                    http.get(`/hire/getappliers/${job_id}`),
                ]);

                if (mainData?.data && mainData?.data?.data) {
                    setData(mainData?.data?.data);
                    setApplierData(applierData.data.data);

                    // Fetch user data for each applier
                    applierData?.data?.data?.forEach((applier) => {
                        if (applier.applier) {
                            fetchUserData(applier.applier);
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Handle errors or set some error state to show a message
            }
        };

        fetchData();
    }, [job_id]); // Depend on job_id so if it changes, re-fetch data
    const handleDownload = (attachmentUrl, fileName) => {
        const fetchFile = async () => {
            try {
                const response = await fetch(attachmentUrl);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        };
        fetchFile();
    };

    const message = (userId) => {
        navigate('/hirer/message', { state: { userId } })
      };
      
    return (
        <div className='w-[80%] mx-auto'>
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
                <div className="p-4 flex flex-col w-3/4 gap-4 mx-auto">
                    <h1 className='text-3xl font-bold mt-4 text-green-600 mb-4 mx-auto'>Jop Applicants</h1>
                    {applierData &&
                        applierData.map((applier, index) => {
                            const userId = applier.applier;
                            const user = userData?.[userId];
                            return applier.cover_letter || applier.offered_amount || applier.attachment_url ? (
                                <Accordion key={applier._id} firstName={user?.fname} lastName={user?.lname} indexCount={index}>
                                    <div className=''>
                                        <div className="bg-gray-200 border border-gray-300 shadow-lg rounded-md p-6 w-full mt-8">
                                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Applicant: {user?.fname?.toUpperCase()} {user?.lname?.toUpperCase()}</h2>
                                            <div className="flex flex-col space-y-4">
                                                <div>
                                                    <label className="text-gray-600">Attachment:</label>
                                                    {applier.attachment_urls.length > 0 ? (
                                                        applier.attachment_urls.map((attachment, index) => {
                                                            // Split the URL at "uploads/" to get the filename
                                                            const parts = attachment?.split("uploads/");
                                                            const filename = parts?.length === 2 ? parts[1] : attachment;
                                                            return (
                                                                <div key={index} className="flex items-center">
                                                                    <p className="text-green-600 inline">{filename}</p>
                                                                    <i
                                                                        className="fa-solid fa-download cursor-pointer text-2xl text-green-600 mx-4"
                                                                        onClick={() => handleDownload(attachment, filename)}
                                                                    ></i>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p className="text-green-700">No File Attachments</p>
                                                    )}
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
                                                <button className='rounded-md text-white bg-green-600 hover:bg-green-500 px-3 py-1.5 text-base font-semibold' onClick={() => message(user?._id)}>Contact Applicant</button>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </Accordion>
                            ) : null;
                        })}
                    {!applierData || (applierData.length === 0 && (
                        <h1 className="text-3xl font-bold">No Appliers for this job</h1>
                    ))}
                </div>
            </div>
        </div>
    );
}
