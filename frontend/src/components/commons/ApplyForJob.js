import React from 'react';
import { useParams } from 'react-router-dom';

const ApplyForJob = ({ title, description, buttonText, onClick }) => {
  const params = useParams()
  console.log(params)
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-medium mb-2">{/* title will be here */}{params.id}
      </h2>
      <p className="text-gray-700 mb-4">
        {/* description will be here */}
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
      <button className="py-2 px-4 bg-blue-500 text-white font-medium rounded-sm hover:bg-blue-700" onClick={onClick}>
        {/* button text will be here */}
        Apply
        {buttonText}
      </button>
    </div>
  );
};

export default ApplyForJob;