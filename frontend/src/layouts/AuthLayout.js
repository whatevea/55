import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <div className="p-4">
                <Outlet />
            </div>
        </>
    );
};

export default AuthLayout;
