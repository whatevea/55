import React, { useState } from 'react';

const MessageWindow = () => {
  const handleClose = () => {
    // onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-md w-[80%] mx-auto my-6">
        <div className="p-4 rounded-md h-lvh md:h-96">
          <textarea
            className="p-4 border-2 focus:border-green-600 outline-none w-full h-full rounded-md"
            placeholder="Please enter your message..."
          ></textarea>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold mr-2" onClick={handleClose}>
            Send message
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
