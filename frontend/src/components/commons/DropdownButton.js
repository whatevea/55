import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import face from '../../assets/images/nerd-face.jpg'

const DropdownButton = ({ firstName, userLoggingOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        // Handle different options, e.g., navigate to a different page, logout, etc.
        console.log(`Selected option: ${option}`);
        if (option === "Logout") {
            userLoggingOut()
        } else if (option === 'My Applied Jobs') {
            navigate('/freelancer/myjobs')
        } else if (option === 'Profile') {
            navigate('/freelancer/freelancer-profile')
        }
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={handleToggle}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Hi, {firstName.toUpperCase()}
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-[300px] rounded-md shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5">
                    <div className="py-1 flex flex-col">
                        <img src={face} alt='user-image'className='w-[80px] h-[80px] mx-auto'/>
                        <p className='mx-auto'>{firstName.toUpperCase()}</p>
                        <button
                            onClick={() => handleOptionClick('Profile')}
                            className="block px-4 py-2 text-base text-black hover:bg-green-500 hover:text-white hover:font-bold hover:text-lg hover:border-2 hover:border-solid hover:border-green-800"
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => handleOptionClick('My Applied Jobs')}
                            className="block px-4 py-2 text-base text-black hover:bg-green-500 hover:text-white hover:font-bold hover:text-lg hover:border-2  hover:border-solid hover:border-green-800"
                        >
                            My Applied Jobs
                        </button>
                        <button
                            onClick={() => handleOptionClick('Logout')}
                            className="block px-4 py-2 text-base text-black hover:bg-green-500 hover:text-white hover:font-bold hover:text-lg hover:border-2 hover:border-solid hover:border-green-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}


export default DropdownButton
