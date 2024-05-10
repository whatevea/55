import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start m-4">
      <div className="bg-green-50 p-4 rounded-md mb-4 md:mr-4 md:mb-0 text-sm">
        <h2 className="text-base font-semibold mb-2">Filters</h2>
        <div className="mb-2">
          <h3 className="text-sm font-semibold">ORDER STATUS</h3>
          <div>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              On the way
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              Delivered
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              Cancelled
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              Returned
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">ORDER TIME</h3>
          <div>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              Last 30 days
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              2023
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              2022
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              2021
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              2020
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" className="form-checkbox mr-2" />
              Older
            </label>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search your orders here"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="flex items-center mb-4">
            {/* <img src="/robot.png" alt="Robot" className="w-12 h-12 mr-2" />
            <img src="/gift.png" alt="Gift" className="w-12 h-12 ml-2" /> */}
          </div>
          <p className="text-lg font-semibold mb-4">You have no orders</p>
          <Link
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 text-base font-semibold"
            to="/buy"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
