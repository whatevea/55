import React, { useEffect, useState } from 'react';
import http from '../../config/http';
import moment from 'moment';
import { Link } from 'react-router-dom';

function HirerJobList() {

    const [jobPosts, setJobPosts] = useState([]);

    console.log('jobPosts is', jobPosts)

    let formattedCreatedAt

    useEffect(() => {
        // Function to fetch job posts from the backend
        const fetchJobPosts = async () => {
            try {
                const response = await http.get('/hire/postjob');
                setJobPosts(response.data.data); // Assuming the response contains job posts data
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPosts(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className='px-6'>

            <div className='text-center text-3xl text-green-600 font-bold mt-4'>

                <h1 className="text-2xl mx-auto">See your Jobs:</h1>
            </div>
            {
                jobPosts.reverse().map((jobPost) => (
                    <div className="bg-green-50  rounded-md shadow-sm overflow-hidden mt-4 p-4 flex items-center justify-between" key={jobPost.id}>
                        <div className='w-3/4'>
                            <div className='text-sm'>
                                Posted: {formattedCreatedAt = moment(jobPost?.createdAt).fromNow()}
                            </div>
                            <h2 className="text-2xl font-medium mb-2">{jobPost?.title}</h2>
                            <div className='mb-2'>
                                {
                                    jobPost?.budgetType === 'hourly' ? (
                                        <div>
                                            <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobPost?.budgetType}</span>: <span className='capitalize inline-block mx-1 font-bold text-sm'>${jobPost?.budgetHourlyMin}</span>-<span className='capitalize inline-block font-bold mx-1 text-sm'>${jobPost?.budgetHourlyMax}</span>
                                            <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                                            <span className='capitalize inline-block mx-1 font-bold text-sm'>Experience: {jobPost?.scopeExperience}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='capitalize inline-block mx-1 text-sm'>{jobPost?.budgetType}</span>
                                            <span className='capitalize inline-block mx-1 text-sm'>${jobPost?.budgetFixed}</span>
                                            <span className='capitalize inline-block mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                                            <span className='capitalize inline-block mx-1 text-sm'>Experience: {jobPost?.scopeExperience}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="text-gray-700 mb-4 break-words">
                                {jobPost?.description}
                            </div>
                            <div className="flex mt-4 mb-4">
                                {jobPost?.skills_required?.map((skill) => (
                                    <span key={skill} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                        {skill}
                                    </span>
                                ))}
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
                ))}
        </div>
    );
}

export default HirerJobList;
