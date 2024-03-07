import React, { useEffect, useState } from 'react'
import http from '../../config/http';
import { FaUserCircle, FaArrowLeft, FaArrowRight, FaRegEnvelope } from 'react-icons/fa';


const SearchForTalent = () => {

    const [userData, setUserData] = useState(null)

    console.log('userData is', userData);

    useEffect(() => {
        // Function to fetch job posts from the backend
        const fetchUsers = async () => {
            try {
                const response = await http.get('/auth/getBulkUserData');
                setUserData(response.data.data); // Assuming the response contains job posts data
            } catch (error) {
                console.error('Error fetching User Data:', error);
            }
        };

        fetchUsers(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const onContactClick = () => {

    }

    return (
        <div className="flex flex-col items-center justify-center p-4 m-4 border-2 bg-white rounded-xl shadow-md gap-4">
            {userData?.map((user) => (
                <div
                    className="flex p-5 w-3/4 bg-gray-100 items-center justify-between rounded-lg shadow-md"
                    key={user._id}
                >
                    <div className="flex justify-evenly gap-4 w-3/4">
                        <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg w-1/2">
                            <FaUserCircle size={50} className="mb-2 text-green-600" />
                            <p className="text-gray-800 font-semibold">
                                {user.fname.toUpperCase()} {user.lname.toUpperCase()}
                            </p>
                        </div>
                        <div className="flex flex-col justify-between bg-green-100 p-4 rounded-lg w-1/2">
                            <div className="text-gray-800 font-semibold">
                                User Details will be Here
                                {user.bio}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onContactClick}
                        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white font-semibold flex items-center"
                    >
                        <FaRegEnvelope className="text-lg inline mr-2" />
                        Contact User
                    </button>
                </div>
            ))}

            {/* Pagination */}
            <div className="flex mt-6">
                <button className="p-2 mx-1 text-lg rounded bg-green-600 hover:bg-green-500 text-white font-semibold">
                    <FaArrowLeft className="inline mr-1" /> Prev Page
                </button>
                <button className="p-2 mx-1 text-lg rounded bg-green-600 hover:bg-green-500 text-white font-semibold">
                    1
                </button>
                <button className="p-2 mx-1 text-lg rounded bg-gray-200 text-black font-semibold">
                    2
                </button>
                <button className="p-2 mx-1 text-lg rounded bg-green-600 hover:bg-green-500 text-white font-semibold">
                    3
                </button>
                <button className="p-2 mx-1 text-lg rounded bg-green-600 hover:bg-green-500 text-white font-semibold">
                    Next Page <FaArrowRight className="inline ml-1" />
                </button>
            </div>
        </div>

    );
}

export default SearchForTalent