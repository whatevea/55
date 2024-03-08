import React from "react";
import { useNavigate } from "react-router-dom";

export default function FindWork() {

  const navigate = useNavigate()

  const freelancerOptions = [
    { label: 'Profile', action: 'Profile' },
    { label: 'Search Jobs', action: 'Search Jobs' },
    { label: 'My Applied Jobs', action: 'My Applied Jobs' },
  ];

  const handleOptionClick = (option) => {
    switch (option) {
      case 'Profile':
        navigate('/freelancer/freelancer-profile');
        break;
      case 'Search Jobs':
        navigate('/freelancer/jobseeker');
        break;
      case 'My Applied Jobs':
        navigate('/freelancer/myjobs');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-start p-4 ">
      <div className="origin-top-left absolute left-36 mt-0 w-[200px] rounded-b-lg shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5">
        <div className="flex flex-col">
          {freelancerOptions.map((opt) => (
            <button
              key={opt.action}
              onClick={() => handleOptionClick(opt.action)}
              className={`block px-4 py-2 text-left text-lg font-semibold text-black hover:bg-green-500  hover:text-white hover:font-bold ${opt.label=='My Applied Jobs'?'': 'border-b border-solid border-green-600' } ${opt.label == "My Applied Jobs" ? 'hover:rounded-b-lg' : ''} `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
