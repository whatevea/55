import React from "react";

const NavDrawer = ({ isOpen, position, children }) => {
  let startingPos = "",
    showingPos = "";
  
  if (position === "left") {
    startingPos = "left-[-100%]";
    showingPos = "left-0 top-0";
  }
  if (position === "right") {
    startingPos = "right-[-100%]";
    showingPos = "right-0";
  }
  if (position === "top") {
    startingPos = "top-[-100%]";
    showingPos = "top-[70px] left-0";
  }
  return (
    <div
      className={`absolute ${
        isOpen ? showingPos : startingPos
      } fixed duration-500 ease-in-out pt-20 overflowY-scroll bg-white h-[100vh] flex flex-col md:w-1/2 w-full md:border-r md:border-green-600 gap-6 z-10 transition-all`}
    >
      {children}
    </div>
  );
};

export default NavDrawer;
