import React from "react";

const LinksDrawer = ({ isOpen, children, setHoveredIndex }) => {
  return (
    <div
      className={`bg-white shadow-lg absolute ${
        isOpen ? "top-[65px] left-0" : "top-[-100%]"
      } h-auto w-full z-10`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {children}
    </div>
  );
};

export default LinksDrawer;
