// import React, { useState } from 'react';

// const AccordionItem = ({ title, content, isLast }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={`mb-0 ${!isLast ? 'border-b border-gray-300 ' : ''}`}>
//       <button
//         className="w-full p-4 bg-green-50 text-center cursor-pointer text-base font-bold flex justify-between"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title} <i className="fa-solid fa-plus ml-2"></i>
//       </button>
//       {isOpen && (
//         <div className="p-4 bg-green-50 border-2 border-solid border-blue-600">
//           <p>{content}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const Accordion = () => {
//   const items = [
//     { title: 'Promote With Ads', content: 'Content for Item 1' },
//     { title: 'Connects', content: 'Content for Item 2' },
//     { title: 'Preferences', content: 'Content for Item 3' },
//     { title: 'Proposals', content: 'Content for Item 4' },
//     { title: 'Project Catalog', content: 'Content for Item 5' },
//   ];

//   return (
//     <div className="max-w-md mx-auto mt-8 rounded-3xl">
//       {items.map((item, index) => (
//         <AccordionItem
//           key={index}
//           title={item.title}
//           content={item.content}
//           isLast={index === items.length - 1}
//         />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


import React, { useState } from 'react';

const Accordion = ({children, indexCount}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-green-500 p-4 rounded-lg">
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleAccordion}>
        <span className="text-white text-lg font-bold">Applicant Information {indexCount + 1}</span>
        <span className="text-white font-bold"><i className="text-lg fa-solid fa-plus"></i></span>
      </div>
      {isOpen && (
        <div className='bg-green-50 rounded-md'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;