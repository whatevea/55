import asyncHandler from 'express-async-handler';
import Job from '../models/job.js';
import Applied_Vacancy from '../models/applied_vacancy.js';

export const addJob = asyncHandler(async (req, res) => {
    const { title, skill, scope, budget, provider, description } = req.body;
    let data = {
        provider: provider,
        budgetType: budget.type,
        title: title,
        skills_required: skill,
        scopeDuration: scope.duration,
        scopeExperience: scope.experience,
        description: description.text,
        attachmentUrl: description.attachmentUrl
    };

    if (budget.type === "hourly") {
        data.budgetHourlyMin = budget.hourlyRateFrom;
        data.budgetHourlyMax = budget.hourlyRateTo;
    }
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
    const jobs = await Job.find();
    res.status(200).json({
        success: true,
        data: jobs,
    });
})

export const getSingleJobPost = asyncHandler(async (req, res) => {
    const jobId = req.params.id; // Assuming the parameter is named 'id'
    // Use findById to find a single document by its ID
    const job = await Job.findById(jobId);
    console.log('job is', job)
    if (!job) {
        // If no job is found, respond with a 404 Not Found status
        res.status(404).json({ success: false, message: 'Job not found' });
    } else {
        // If a job is found, respond with a 200 OK status and the job data
        res.status(200).json({ success: true, data: job });
    }
})

export const getApplierList = asyncHandler(async (req, res) => {
    const applied = await Applied_Vacancy.find(req.body.job_id);
    res.status(200).json({
        success: true,
        data: applied,
    });
})

export default addJob