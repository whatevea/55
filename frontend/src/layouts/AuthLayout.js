import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/commons/Navbar";
import Skills from "../components/Skills/Skills";
const AuthLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
