import asyncHandler from "express-async-handler";
import Job from "../models/job.js";
import Applied_Vacancy from "../models/applied_vacancy.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const addJob = asyncHandler(async (req, res) => {
  const {
    title,
    user_class,
    user_university,
    category,
    scope,
    budget,
    provider,
    description,
    imagesUrl,
  } = req.body;

  let data = {
    provider: provider,
    budgetType: budget.type,
    title: title,
    scopeDuration: scope?.duration,
    scopeExperience: scope?.experience,
    description: description.text,
    category: category,
    attachmentUrls: description.attachmentUrls,
    imagesUrls: imagesUrl,
  };

  // if (budget.type === "hourlyPrice") {
  //   data.budgetHourlyPrice = budget.hourlyRate;
  // }

  if (budget.type === "fixedPrice") {
    data.budgetFixed = budget.fixedPrice;
  }

  // Create the job in the database
  try {
    const job = await Job.create(data);
    res.status(201).json(job); // Send back the created job with a 201 Created status
  } catch (error) {
    // If there's an error, respond with a 400 Bad Request status and the error message
    res.status(400).json({ message: error.message });
  }
});

export const getJobsList = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: jobs,
  });
});

// GETTING LIST OF JOBS BY CATEGORY
export const getJobsListByCategory = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  let query = { category }; // Initial query object with category filter

  // If search query is provided, add it to the query object
  if (search !== null && search !== undefined && search !== "") {
    query = {
      ...query,
      $or: [
        { title: { $regex: search, $options: "i" } }, // Match title case-insensitively
        { description: { $regex: search, $options: "i" } }, // Match description case-insensitively
        { category: { $regex: search, $options: "i" } },
      ],
    };
  }

  const totalJobs = await Job.countDocuments(query); // Count documents based on category and search
  const skip = (page - 1) * limit;

  const totalPages = Math.ceil(totalJobs / limit);
  const nextPage = page < totalPages ? page + 1 : null; // Calculate nextPage

  let remainingDocs = totalJobs - page * limit;
  if (remainingDocs > limit) remainingDocs = limit;

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: jobs,
    currentPage: page,
    totalPages: totalPages,
    nextPage: nextPage,
  });
});

export const getSingleJobPost = asyncHandler(async (req, res) => {
  const jobId = req.params.id; // Assuming the parameter is named 'id'
  // Use findById to find a single document by its ID
  const job = await Job.findById(jobId);
  if (!job) {
    // If no job is found, respond with a 404 Not Found status
    res.status(404).json({ success: false, message: "Job not found" });
  } else {
    // If a job is found, respond with a 200 OK status and the job data
    res.status(200).json({ success: true, data: job });
  }
});

export const getApplierList = asyncHandler(async (req, res) => {
  const job_id = req.params.id; // Use req.params to get URL parameters
  const applied = await Applied_Vacancy.find({ job: job_id });
  res.status(200).json({
    success: true,
    data: applied,
  });
});

// export const getJobsListBasedOnHirerUserId = asyncHandler(async (req, res) => {
//   const hirerUserId = req.params.hirerUserId; // Assuming the parameter is named 'hirerUserId'

//   try {
//     const jobs = await Job.find({ provider: hirerUserId }).sort({
//       createdAt: -1,
//     });

//     // console.log("jobs is", jobs);

//     res.status(200).json({
//       success: true,
//       data: jobs,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching jobs based on hirer user ID",
//       error: error.message,
//     });
//   }
// });

export const getJobsListBasedOnHirerUserId = asyncHandler(async (req, res) => {
  const hirerUserId = req.params.hirerUserId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;

  try {
    const jobs = await Job.find({ provider: hirerUserId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalCount = await Job.countDocuments({ provider: hirerUserId });

    res.status(200).json({
      success: true,
      data: jobs,
      meta: {
        // totalCount,
        hasNext: totalCount > startIndex + limit,
        // page,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs for hirer user",
      error: error.message,
    });
  }
});

export default addJob;
