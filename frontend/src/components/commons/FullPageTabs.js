import React, { useState } from 'react';

const Tab = ({ label, active, onClick }) => (
  <div
    className={`cursor-pointer p-4 ${
      active ? 'border-b-2 border-gray-100' : ''
    } text-base font-semibold`}
    onClick={onClick}
  >
    {label}
  </div>
);

const FullPageTabs = () => {
  const [activeTab, setActiveTab] = useState('Best Matches');

  const tabs = ['Best Matches', 'Most Recent', 'Saved Jobs'];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-green-600 text-black rounded-t-xl">
        <div className="text-2xl font-bold">Job Listings</div>
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-50">
        {/* Content for the active tab goes here */}
        {activeTab === 'Best Matches' && <div className='text-base font-semibold'>Best Matches Content suraj</div>}
        {activeTab === 'Most Recent' && <div className='text-base font-semibold'>Most Recent Content</div>}
        {activeTab === 'Saved Jobs' && <div className='text-base font-semibold'>Saved Jobs Content</div>}
      </div>
    </div>
  );
};

export default FullPageTabs;
