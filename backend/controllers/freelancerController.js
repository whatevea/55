import asyncHandler from 'express-async-handler';
import Applied_Vacancy from '../models/applied_vacancy.js';


const apply_job = asyncHandler(async (req, res) => {
    const { job, user_id, cover_letter, offered_amount, attachment_url } = req.body;
    console.log("recevived it", req.body)
    const data = { job: job, user_id: user_id, cover_letter: cover_letter, offered_amount: offered_amount, attachment_url: attachment_url }
    try {
        const job = await Applied_Vacancy.create(data);
        res.status(201).json(job); // Send back the created job with a 201 Created status
    } catch (error) {
        // If there's an error, respond with a 400 Bad Request status and the error message
        res.status(400).json({ message: error.message });
    } 
})
export default apply_job
