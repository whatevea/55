import React from "react";
import MobileMenu from "../navigation/MobileMenu";

const NavDrawer = ({ isOpen, position, children }) => {
  let startingPos = "",
    showingPos = "";
  console.log("isOpen", isOpen);
  if (position === "left") {
    startingPos = "left-[-100%]";
    showingPos = "left-0";
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
      className={`absolute top-[64px] ${
        isOpen ? showingPos : startingPos
      } duration-500 ease-in-out bg-white h-full flex flex-col md:w-1/2 w-full md:border-r md:border-t md:border-b md:border-green-600 md:rounded-md md:h-screen gap-6 z-10 transition-all`}
    >
      {children}
    </div>
  );
};

export default NavDrawer;
