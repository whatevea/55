import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills/Skills";
const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <Skills />
      <Outlet />
    </div>
  )
};

export default AuthLayout;
