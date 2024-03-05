import React, { useEffect, useState } from 'react';
import http from '../../config/http';

function HirerJobList() {

    const [jobPosts, setJobPosts] = useState([]);

    console.log('jobPosts is',jobPosts);

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
            <div className="bg-green-50  rounded-md shadow-sm overflow-hidden mt-4">
                {/* border border-gray-200 */}
                <div className="flex items-center px-4 py-5 sm:p-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Front End Developer
                        </h3>
                        <p className="text-sm text-gray-500">
                            ABC Company - Remote (US) - Full Time
                        </p>
                    </div>
                </div>
                <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
                    <ul className="flex flex-wrap -m-1">
                        <li className="m-1">
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-center text-gray-600 bg-green-200">
                                HTML
                            </span>
                        </li>
                        <li className="m-1">
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-center text-gray-600 bg-green-200">
                                CSS
                            </span>
                        </li>
                        <li className="m-1">
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-center text-gray-600 bg-green-200">
                                JavaScript
                            </span>
                        </li>
                        <li className="m-1">
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-center text-gray-600 bg-green-200">
                                React
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                        <i className="fa-solid fa-clock mr-2 text-gray-500"></i>
                        <span className="text-sm text-gray-500">Posted 1 day ago</span>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 rounded-md text-base font-medium text-center text-white bg-green-600 hover:bg-green-500 "
                    >
                        See Applications For This Job
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HirerJobList;
