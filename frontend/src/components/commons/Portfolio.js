import React from "react";

const Portfolio = () => {
  const filters = ["Show all", "Nature", "Cars", "People"];
  const images = [
    {
      src: "path/to/girl.jpg",
      alt: "Girl",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
    {
      src: "path/to/man.jpg",
      alt: "Man",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
    {
      src: "path/to/woman.jpg",
      alt: "Woman",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
      <p className="mb-4">Click on the buttons to filter a category:</p>
      <div className="flex mb-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img src={image.src} alt={image.alt} className="w-full" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{image.alt}</h2>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
