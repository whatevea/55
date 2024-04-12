import { useEffect, useState } from "react";

const Scope = ({ setIsValid, updateJobData, jobData }) => {
  // State for tracking the duration selection
  const [duration, setDuration] = useState("");
  // State for tracking the experience level selection
  const [experience, setExperience] = useState("");

  useEffect(() => {
    // Check if both duration and experience have been selected
    const isValid = duration !== "" && experience !== "";
    setIsValid(isValid);

    updateJobData({
      scope: {
        duration,
        experience,
      },
    });
  }, [duration, experience]);

  useEffect(() => {
    setDuration(jobData.scope?.duration || "");
    setExperience(jobData.scope?.experience || "");
  }, []);

  return (
    <div className="font-semibold h-52">
      <p>How long will you render your services?</p>
      <div>
        <input
          type="radio"
          id="30days"
          value="30days"
          name="duration"
          onChange={(e) => setDuration(e.target.value)}
          checked={duration === "30days"}
        />
        <label htmlFor="30days"> Month</label>
      </div>
      <div>
        <input
          type="radio"
          id="180days"
          value="180days"
          name="duration"
          onChange={(e) => setDuration(e.target.value)}
          checked={duration === "180days"}
        />
        <label htmlFor="180days"> 6 Months</label>
      </div>
      <div>
        <input
          type="radio"
          id="90days"
          value="90days"
          name="duration"
          onChange={(e) => setDuration(e.target.value)}
          checked={duration === "90days"}
        />
        <label htmlFor="90days"> 3 Months</label>
      </div>
      <p className="mt-4">What level of experience will it Provide?</p>
      <div>
        <input
          type="radio"
          id="entry"
          value="entry"
          name="experience"
          onChange={(e) => setExperience(e.target.value)}
          checked={experience === "entry"}
        />
        <label htmlFor="entry"> Entry</label>
      </div>
      <div>
        <input
          type="radio"
          id="intermediate"
          value="intermediate"
          name="experience"
          onChange={(e) => setExperience(e.target.value)}
          checked={experience === "intermediate"}
        />
        <label htmlFor="intermediate"> Intermediate</label>
      </div>
      <div>
        <input
          type="radio"
          id="advanced"
          value="advanced"
          name="experience"
          onChange={(e) => setExperience(e.target.value)}
          checked={experience === "advanced"}
        />
        <label htmlFor="advanced"> Advanced</label>
      </div>
    </div>
  );
};

export default Scope;
