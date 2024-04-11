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

const ProductContent = ({ appliedJobsId, categoryWiseJobs }) => {
  console.log("categoryWiseJobs is", categoryWiseJobs);

  return (
    <div>
      {categoryWiseJobs?.length > 0 ? (
        categoryWiseJobs?.map((job, index) =>
          renderJobPosting(job, index, appliedJobsId.includes(job._id))
        )
      ) : (
        <div className="text-center py-8 font-bold text-xl text-green-600">
          No jobs found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductContent;
