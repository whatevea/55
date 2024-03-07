import React from "react";

const LinksDrawer = ({ isOpen, children, setHoveredIndex }) => {
  return (
    <div
      className={`${
        isOpen ? "top-[50px] left-0" : "top-[-100%]"
      } h-auto w-[300px] z-10 fixed`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {children}
    </div>
  );
};

export default LinksDrawer;
