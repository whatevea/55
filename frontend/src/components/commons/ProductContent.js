import { Link } from "react-router-dom";
import JobPosting from "./JobPosting";

const renderJobPosting = (job, hasApplied) => (
  <div key={job._id}>
    {hasApplied ? (
      <a
        href="#"
        className="cursor-not-allowed"
        onClick={(e) => e.preventDefault()}
      >
        <JobPosting job={job} hasApplied />
      </a>
    ) : (
      <Link to={`/freelancer/apply/${job._id}`}>
        <JobPosting job={job} />
      </Link>
    )}
  </div>
);

const ProductContent = ({
  //   filteredJobs,
  productJobs,
  appliedJobsId,
  productFilteredJobs,
}) => {
  return (   
    <div className="flex-1 p-4 ">
      {productFilteredJobs?.length > 0
        ? productFilteredJobs?.map((job) =>
            renderJobPosting(job, appliedJobsId.includes(job._id))
          )
        : productJobs?.map((job) =>
            renderJobPosting(job, appliedJobsId.includes(job._id))
          )}
    </div>
  );
};

export default ProductContent;
