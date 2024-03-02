import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchJob = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const data = [
        {
          id: 1,
          title: "React Developer",
          job_type: "hourly-intermediate",
          job_info: "$12.00 - $25.00 Entry level Est. time: Less than 1 month",
          description:
            "We are seeking an experienced web developer to join our team. As a web developer, you will be responsible for designing, coding, and modifying websites, from layout to function. ",
        },
        {
          id: 2,
          title: "Frontend Engineer",
          job_type: "hourly-expert",
          job_info: "$12.00 - $25.00 Entry level Est. time: Less than 1 month",
          description:
            "Expensify is a team of generalists developing today's leading expense management tool. Maintaining our reputation as an innovative leader in the world of finance requires ",
        },
        {
          id: 3,
          title: "Full Stack Developer",
          job_type: "fixed-entery level",
          job_info: "$12.00 - $25.00 Entry level Est. time: Less than 1 month",
          description:
            "We are seeking a talented MERN (MongoDB, Express.js, React, Node.js) Full Stack Developer to join our team and assist with WebSocket logic.",
        },
      ];

      const filteredResults = data.filter((job) => {
        const titleMatch = job.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const descriptionMatch = job.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return titleMatch || descriptionMatch;
      });

      setSearchResult(filteredResults);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="md:m-10 m-3">
      <form onSubmit={handleSubmit}>
        <div className="relative m-7">
          <button
            className="absolute inset-y-0 left-0 flex items-center pl-3"
            type="submit"
          >
            <FiSearch />
          </button>
          <input
            value={searchQuery}
            onChange={handleChange}
            className="border md:w-1/2 w-full h-12 outline-none active:border-emerald-500 hover:border-emerald-500 border-gray-400 rounded-3xl pl-10 pr-4 py-2"
            placeholder="search"
          />
        </div>
      </form>
      {loading && <p className="m-10">Searching...</p>}
      {searchResult.length > 0 && (
        <div>
          <h1 className="m-7">Search Result</h1>
          <ul>
            {searchResult.map((job) => (
              <li key={job.id} className="m-9 grid gap-3">
                <h1 className="md:text-lg text-md font-medium">{job.title}</h1>
                <ul className="md:text-base text-sm flex flex-col md:flex-row text-gray-500 font-medium">
                  <li>{job.job_type}-</li>
                  <li>{job.job_info}</li>
                </ul>
                <p className=" text-xs md:text-sm">{job.description}</p>
                <div className="m-7 flex items-center border-t"></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchJob;
