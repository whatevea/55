import React, { useState, useRef } from "react";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  //   const handleScroll = (direction) => {
  //     const gallery = galleryRef.current;
  //     const scrollAmount = gallery.offsetWidth;

  //     if (direction === "left") {
  //       gallery.scrollLeft -= scrollAmount;
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //       );
  //     } else {
  //       gallery.scrollLeft += scrollAmount;
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }
  //   };

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto scroll-smooth rounded-md"
        ref={galleryRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 h-96 ${
              index === currentIndex ? "opacity-100" : "opacity-100"
            }`}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-[100%] h-96"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-sm font-semibold text-black">
          Please Scroll Horizontally For More Images
        </p>
      </div>
      {/* <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none"
        onClick={() => handleScroll("left")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none"
        onClick={() => handleScroll("right")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default ImageGallery;
