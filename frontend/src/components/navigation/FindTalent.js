import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const FindTalent = () => {

    const navigate = useNavigate()

    const hireOptions = [
        { label: 'Profile', action: 'Profile' },
        { label: 'Post Jobs', action: 'Post Jobs' },
        { label: 'My Posted Jobs', action: 'My Posted Jobs' },
        { label: 'Search For Talent', action: 'Search For Talent' },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleOptionClick = (option) => {
        switch (option) {
            case 'Profile':
                navigate('/hirer/hirer-profile');
                break;
            case 'Post Jobs':
                navigate('/hirer/jobpost');
                break;
            case 'My Posted Jobs':
                navigate('/hirer/dashboard');
                break;
            case 'Search For Talent':
                navigate('/hirer/searchfortalent');
                break;
            default:
                break;
        }
    };

    return (
        <div className='p-4 flex justify-start'>
            <div className="origin-top-left absolute left-36 top-28-5 w-[200px] rounded-b-lg shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5 z-30">
                <div className="flex flex-col">
                    {hireOptions.map((opt) => (
                        <button
                            key={opt.action}
                            onClick={() => handleOptionClick(opt.action)}
                            className={`block px-4 py-1.5 text-left text-sm font-semibold text-black hover:bg-green-500  hover:text-white hover:font-bold ${opt.label=='Search For Talent'?'': 'border-b border-solid border-green-600' } ${opt.label == "Search For Talent" ? 'hover:rounded-b-lg' : ''}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FindTalent