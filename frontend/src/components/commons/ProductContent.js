import { Link } from "react-router-dom";
import JobPosting from "./JobPosting";

const renderJobPosting = (job) => (
  <div key={job._id}>
    {/* <Link to={`/freelancer/apply/${job._id}`}> */}
    <JobPosting job={job} />
    {/* </Link> */}
  </div>
);

const ProductContent = ({ categoryWiseJobs }) => {
  return (
    <div>
      {categoryWiseJobs?.length > 0 ? (
        categoryWiseJobs?.map((job) => renderJobPosting(job))
      ) : (
        <div className="text-center py-8 font-bold text-xl text-green-600">
          No jobs found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductContent;
