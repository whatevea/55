import React, { useEffect, useState } from "react";

const ImageGalleryHover = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    // Set the selected image to the first element of the images array
    setSelectedImage(images[0]);
  }, [images]);

  console.log("images is", images);
  console.log("selectedImage is", selectedImage);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="lg:w-96 lg:h-96 w-[100%] ">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className="w-20 md:w-24 h-20 md:h-24 object-cover cursor-pointer"
            onMouseEnter={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryHover;
