import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig } from "../../config/toastConfig";

const Portfolio = () => {
  const userData = useSelector((state) => state.User);
  const userId = userData.userData?._id;

  const filters = ["Show all", "Nature", "Cars", "People"];
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [formErrors, setFormErrors] = useState({});
  const [portfolios, setPortfolios] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const initialFormData = {
    image: null,
    link: "",
    description: "",
    userId: userId,
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchPortfolios = async () => {
    try {
      const response = await http.get(`/portfolio/get-portfolio/${userId}`);

      console.log("userId:", userId);

      if (response.status === 200) {
        const fetchedPortfolios = response.data.portfolios;
        setPortfolios(fetchedPortfolios);
      } else {
        console.error("Failed to fetch portfolios:", response.error);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [userId]);

  const validateForm = () => {
    let errors = {};

    if (!formData.image) {
      errors.image = "Please select an image.";
    }

    if (!formData.link.trim()) {
      errors.link = "Please enter a website link.";
    }

    if (!formData.description.trim()) {
      errors.description = "Please enter a description.";
    }

    return errors;
  };

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

    // Validate the form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields", toastConfig);
      return;
    }

    try {
      // Create a FormData object from the existing formData state
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("image", formData.image);
      formDataToSubmit.append("link", formData.link);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("userId", formData.userId);

      // Log the contents of formDataToSubmit
      console.log("formDataToSubmit:", formDataToSubmit);
      for (const [key, value] of formDataToSubmit.entries()) {
        console.log(`inside for loop ${key}: ${value}`);
      }

      // Send the FormData object to the server
      const response = await http.post(
        "/portfolio/submit-portfolio",
        formDataToSubmit
      );

      console.log("response is", response);

      if (response.status === 200) {
        // Handle the successful response from the server
        toast.success("Portfolio submitted successfully");

        // Reset the form after submission
        setFormData(initialFormData);

        // Reset the file input field after successful submission
        fileInputRef.current.value = null;
        await fetchPortfolios();
      } else {
        // Handle the error response from the server
        console.error("Failed to submit portfolio");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("All fields are required", toastConfig);
    }
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
              <input
                type="file"
                name="image"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>
            {formErrors.image && (
              <div className="text-red-500">{formErrors.image}</div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">
                Portfolio Website Link:
              </label>
              <input
                type="text"
                className={`${
                  formErrors.link
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-300"
                } px-2 py-1.5  rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400`}
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </div>
            {formErrors.link && (
              <div className="text-red-500">{formErrors.link}</div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Description:</label>
              <textarea
                className={`${
                  formErrors.description
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-300"
                } px-2 py-1.5  rounded-md focus:outline-none focus:border-green-500 placeholder:text-gray-400`}
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            {formErrors.description && (
              <div className="text-red-500">{formErrors.description}</div>
            )}
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
        {/* {filteredImages.map((image, index) => (
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
       ))}*/}
        {portfolios.length > 0
          ? portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={portfolio.imageLink}
                  alt="Portfolio Image"
                  className="w-full"
                />
                <div className="p-4 flex flex-col items-center">
                  <h2 className="text-lg font-bold">
                    <a
                      className="hover:underline"
                      href={`https://${portfolio.websiteLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {portfolio.websiteLink}
                    </a>
                  </h2>
                  <p>{portfolio.description}</p>
                </div>
              </div>
            ))
          : filteredImages.map((image, index) => (
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
