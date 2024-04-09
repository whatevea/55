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

const ServiceContent = ({
  //   filteredJobs,
  serviceJobs,
  appliedJobsId,
  serviceFilteredJobs,
}) => {
  return (
    // <div className="border-2 border-blue-500">This is the Service content.</div>
    <div className="flex-1 p-4 ">
      {serviceFilteredJobs.length > 0
        ? serviceFilteredJobs?.map((job) =>
            renderJobPosting(job, appliedJobsId.includes(job._id))
          )
        : serviceJobs?.map((job) =>
            renderJobPosting(job, appliedJobsId.includes(job._id))
          )}
    </div>
  );
};

export default ServiceContent;
