import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
