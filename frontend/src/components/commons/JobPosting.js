import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig } from "../../config/toastConfig";
import { add } from "../../redux/reducers/cartSlice";
import ImageGalleryComponent from "./ImageGallery";
import { Link } from "react-router-dom";

const JobPosting = memo(({ job }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add(job));
    toast.success("Job added to cart", toastConfig);
  };

  return (
    <Link to={`/freelancer/details-page/${job._id}`} className="cursor-pointer">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:bg-green-50">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-[100%] md:w-[50%]">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-600 hover:underline mb-2">
                {job.title}
              </h1>
            </div>
            <div>
              {job.budgetType === "hourlyPrice" ? (
                <div>
                  <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                    {job.budgetType === "hourlyPrice" ? (
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
                    ${job.budgetHourlyPrice}
                  </span>
                  {job.category === "Product" ? (
                    <span></span>
                  ) : (
                    <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                      Duration: {job.scopeDuration}
                    </span>
                  )}
                  <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                    Experience: {job.scopeExperience}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="capitalize inline-block mx-1 font-bold text-base">
                    {job.budgetType === "fixedPrice" ? (
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
                    ${job.budgetFixed}
                  </span>
                  {job.category === "Product" ? (
                    <span></span>
                  ) : (
                    <span className="capitalize inline-block mx-1 font-bold text-xl text-green-600">
                      Duration: {job.scopeDuration}
                    </span>
                  )}
                  <span className="capitalize inline-block mx-1 font-bold text-base text-green-600">
                    Experience: {job.scopeExperience}
                  </span>
                </div>
              )}
            </div>
            <p className="text-base my-4 break-words font-medium">
              {job.description}
            </p>
          </div>
          <div className="w-[100%] md:w-[50%] ">
            <ImageGalleryComponent images={job.imagesUrls} />
          </div>
        </div>

        {/* Buy Now and Add to Cart Button Starts Here*/}
        {/* <div className="flex items-center mt-4 gap-3">
        <button
          type="button"
          className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500"
        >
          Buy Now
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div> */}
        {/* Buy Now and Add to Cart Button Ends Here*/}
      </div>
    </Link>
  );
});
export default JobPosting;
