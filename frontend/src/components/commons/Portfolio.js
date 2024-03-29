import React, { useState } from "react";
import Girl from "../../assets/images/people1_girl.jpg";
import Man from "../../assets/images/people2_man.jpg";
import Woman from "../../assets/images/people3_woman.jpg";
import Retro from "../../assets/images/cars1_retro.jpg";
import Classic from "../../assets/images/cars3_classic.jpg";
import Fast from "../../assets/images/cars2_fast.jpg";
import Mountains from "../../assets/images/mountains.jpg";
import Lights from "../../assets/images/lights.jpg";
import Forest from "../../assets/images/nature.jpg";
import http from "../../config/http";

const Portfolio = () => {
  const filters = ["Show all", "Nature", "Cars", "People"];
  const [selectedFilter, setSelectedFilter] = useState("Show all");

  const [formData, setFormData] = useState({
    image: null,
    link: "",
    description: "",
  });

  const images = [
    {
      src: Girl,
      alt: "Girl",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Man,
      alt: "Man",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Woman,
      alt: "Woman",
      category: "People",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Retro,
      alt: "Retro",
      category: "Cars",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Fast,
      alt: "Fast",
      category: "Cars",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Classic,
      alt: "Classic",
      category: "Cars",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Mountains,
      alt: "Mountains",
      category: "Nature",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Lights,
      alt: "Lights",
      category: "Nature",
      description: "Lorem ipsum dolor.",
    },
    {
      src: Forest,
      alt: "Forest",
      category: "Nature",
      description: "Lorem ipsum dolor.",
    },
  ];

  const filteredImages =
    selectedFilter === "Show all"
      ? images
      : images.filter((image) => image.category === selectedFilter);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object from the existing formData state
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("image", formData.image);
      formDataToSubmit.append("link", formData.link);
      formDataToSubmit.append("description", formData.description);

      // Send the FormData object to the server

      console.log("we are here");

      const response = await http.post(
        "/portfolio/submit-portfolio",
        formDataToSubmit
      );

      if (response.ok) {
        // Handle the successful response from the server
        console.log("Portfolio submitted successfully");
      } else {
        // Handle the error response from the server
        console.error("Failed to submit portfolio");
      }
    } catch (error) {
      console.log("we are inside catch");
      console.error("Error:", error);
    }

    // Reset the form after submission
    setFormData({
      image: null,
      link: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  return (
    <div className="container mx-auto p-4 bg-green-100 m-4 w-[95%] rounded-lg">
      <div className="flex flex-col-reverse md:flex-row md:justify-around">
        <div className="mb-4 p-4 rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4 ">My Portfolio</h1>
          <p className="mb-4 text-xl font-semibold">
            Click on the buttons to filter a category:
          </p>
        </div>
        <div className="rounded-lg p-4 mb-4 border-2 border-green-700 md:w-[40%]">
          <form
            className="flex flex-col gap-2 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-center">
                Submit Portfolio Websites
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">
                Upload Website Image:
              </label>
              <input type="file" name="image" onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">
                Portfolio Website Link:
              </label>
              <input
                type="text"
                className="px-2 py-1.5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Description:</label>
              <textarea
                className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-base font-semibold bg-green-600 hover:bg-green-500 hover:text-white px-2 py-1.5 rounded-md text-white mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex mb-4">
        {filters.map((filter, index) => (
          <button
            type="button"
            key={index}
            className={`bg-gray-200 hover:bg-green-500 text-gray-800 font-semibold text-sm md:text-base md:py-2 py-1 px-2 rounded mr-2  ${
              selectedFilter === filter ? "bg-green-600 text-white" : ""
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img src={image.src} alt={image.alt} className="w-full" />
            <div className="p-4 flex flex-col items-center">
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
