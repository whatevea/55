import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../config/http";
import ImageGalleryHover from "./ImageGallery2";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/reducers/cartSlice";
import { toast } from "react-toastify";
import { toastConfig } from "../../config/toastConfig";
import PaymentMethodOption from "./PaymentMethodOption";

const ContentDetails = () => {
  const [expandedView, setExpandedView] = useState(false);
  const [jobPost, setJobPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobPost = async () => {
      try {
        const response = await http.get(`/hire/singleJobPost/${params.id}`);
        setJobPost(response.data.data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchJobPost();
  }, [params.id]);

  const handleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  const handleAddToCart = () => {
    dispatch(add(jobPost));
    toast.success("Job added to cart", toastConfig);
  };

  const handleBuyNow = () => {
    // Show the pop-up component
    setShowPopup(true);
    // Disable scrolling when the pop-up is displayed
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    // Hide the pop-up component
    setShowPopup(false);
    // Enable scrolling when the pop-up is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col m-4 md:flex-row gap-2 border border-gray-300 p-2 rounded-md">
      <div className="w-[100%] md:w-[40%]">
        <ImageGalleryHover images={jobPost?.imagesUrls || []} />
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-[100%] md:w-[60%]">
        <div className="w-[100%] flex flex-col gap-2 justify-evenly">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-600 hover:underline mb-2">
                {jobPost?.title}
              </h1>
            </div>
            <div>
              {jobPost?.budgetType === "hourlyPrice" ? (
                <div>
                  <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                    {jobPost?.budgetType === "hourlyPrice" ? (
                      <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                        Hourly Price
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="font-bold text-xl text-green-600">
                    {":"}
                  </span>
                  <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                    ${jobPost?.budgetHourlyPrice}
                  </span>
                  {jobPost?.category === "Product" ? (
                    <span></span>
                  ) : (
                    <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                      Duration: {jobPost?.scopeDuration}
                    </span>
                  )}
                  <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                    Experience: {jobPost?.scopeExperience}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="capitalize inline-block mx-1 font-bold text-base">
                    {jobPost?.budgetType === "fixedPrice" ? (
                      <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                        Fixed Price
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="font-bold text-xl text-green-600">
                    {":"}
                  </span>
                  <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                    ${jobPost?.budgetFixed}
                  </span>
                  {jobPost?.category === "Product" ? (
                    <span></span>
                  ) : (
                    <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                      Duration: {jobPost?.scopeDuration}
                    </span>
                  )}
                  <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                    Experience: {jobPost?.scopeExperience}
                  </span>
                </div>
              )}
            </div>
            <p className="text-base my-4 break-words font-medium">
              {jobPost?.description}
            </p>
          </div>

          <div className="flex justify-center items-center mt-4 gap-3">
            <button
              type="button"
              className="px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500"
              onClick={handleBuyNow} // Add event handler to Buy Now button
            >
              Buy Now
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {/* Pop-up component */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-20">
          {" "}
          {/* Pop-up container */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[100vh] overflow-y-auto">
            <PaymentMethodOption jobPost={jobPost} />
            <button
              className="close-button bg-green-600 text-white hover:bg-green-500 px-2 py-1.5 rounded-md font-semibold mx-auto block w-[60%]"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails;
