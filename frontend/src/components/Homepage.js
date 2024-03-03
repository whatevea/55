import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MyJobs from "./JobPost/MyJobs";
import SearchJob from "./JobPost/SearchJob";

const Homepage = () => {
  return (
    <div className="h-lvh">
      <Navbar />
      <Outlet />
      {/* <MyJobs /> */}
      {/* <SearchJob /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
