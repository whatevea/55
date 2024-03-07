import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import face from '../../assets/images/nerd-face.jpg'
import { useSelector } from 'react-redux';

const DropdownButton = ({ userLoggingOut }) => {
    let firstName, lastName;

    const data = useSelector((state) => state?.User);
    if (data) {
        firstName = data.userData?.fname;
        lastName = data.userData?.lname;
        console.log(data)
    }
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        switch (option) {
            case 'Logout':
                userLoggingOut();
                break;
            case 'Profile':
                navigate(data.userData.user_type === 'freelancer' ? '/freelancer/freelancer-profile' : '/hirer/hirer-profile');
                setIsOpen(false);
                break;
            case 'Search Jobs':
                navigate('/freelancer/jobseeker');
                setIsOpen(false);
                break;
            case 'Post Jobs':
                navigate('/hirer/jobpost');
                setIsOpen(false);
                break;
            case 'My Applied Jobs':
                navigate('/freelancer/myjobs');
                setIsOpen(false);
                break;
            case 'My Posted Jobs':
                navigate('/hirer/dashboard');
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const freelancerOptions = [
        { label: 'Profile', action: 'Profile' },
        { label: 'Search Jobs', action: 'Search Jobs' },
        { label: 'My Applied Jobs', action: 'My Applied Jobs' },
    ];

    const hireOptions = [
        { label: 'Profile', action: 'Profile' },
        { label: 'Post Jobs', action: 'Post Jobs' },
        { label: 'My Posted Jobs', action: 'My Posted Jobs' },
    ];

    const options = data.userData.user_type === 'freelancer' ? freelancerOptions : hireOptions;

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={handleToggle}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Hi, {firstName.toUpperCase()} {lastName.toUpperCase()} <i className="fa-solid fa-caret-down text-white"></i>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-[300px] shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5">
                    <div className="flex flex-col">
                        <img src={face} alt='user-image' className='w-[80px] h-[80px] mx-auto rounded-full mt-1' />
                        <p className='mx-auto'>{firstName.toUpperCase()} {data.userData.lname.toUpperCase()}</p>
                        {options.map((opt) => (
                            <button
                                key={opt.action}
                                onClick={() => handleOptionClick(opt.action)}
                                className={`block px-4 py-2 text-lg  text-black hover:bg-green-500 hover:text-white hover:font-bold  ${opt.label == 'Profile' ? 'border-t mt-2 border-b border-solid border-green-600' : 'border-b border-solid border-green-600'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleOptionClick('Logout')}
                            className="block px-4 py-2 text-lg text-black hover:bg-green-500 hover:text-white hover:font-bold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;