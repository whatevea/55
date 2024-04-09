import asyncHandler from "express-async-handler";
import Applied_Vacancy from "../models/applied_vacancy.js";
import Job from "../models/job.js";

export const apply_job = asyncHandler(async (req, res) => {
  const { job, user_id, cover_letter, offered_amount, attachment_urls } =
    req.body;

  const data = {
    job: job,
    applier: user_id,
    cover_letter: cover_letter,
    offered_amount: offered_amount,
    attachment_urls: attachment_urls,
  };
  try {
    const job = await Applied_Vacancy.create(data);
    res.status(201).json(job); // Send back the created job with a 201 Created status
  } catch (error) {
    // If there's an error, respond with a 400 Bad Request status and the error message
    res.status(400).json({ message: error.message });
  }
});

export const getSelfAppliedJobs = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const appliedVacancies = await Applied_Vacancy.find({ applier: userId })
      .populate("job")
      .exec();

    if (!appliedVacancies || appliedVacancies.length === 0) {
      return res
        .status(404)
        .json({ message: "No applied vacancies found for the user" });
    }
    res.json(appliedVacancies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getFilteredJobs = asyncHandler(async (req, res) => {
  const searchText = req.query.search || "";
  const [text, categoryParam] = searchText.split("/");

  // Filter jobs by category
  const filteredJobs = await Job.find({
    category: categoryParam,
    title: { $regex: text, $options: "i" },
  });

  console.log("filteredJobs is", filteredJobs);

  res.status(200).json(filteredJobs);
});
