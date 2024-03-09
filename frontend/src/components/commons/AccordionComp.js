import React, { memo, useState } from 'react';

const Accordion = memo(({ children, indexCount, userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const outerKey = Object.keys(userData)[0]; // Assuming there is only one key in the outer object

  const fname = userData?.[outerKey]?.fname;
  const lname = userData?.[outerKey]?.lname;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-green-500 p-4 rounded-lg">
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleAccordion}>
        <span className="text-white text-lg font-bold">Applicant Name: {fname?.toUpperCase()} {lname?.toUpperCase()} </span>
        <span className="text-white text-xl font-bold">
          {
            isOpen ? <i class="fa-solid fa-minus"></i> : <i className="text-lg fa-solid fa-plus"></i>
          }

        </span>
      </div>
      {isOpen && (
        <div className='bg-green-50 rounded-md'>
          {children}
        </div>
      )}
    </div>
  );
});

export default Accordion;