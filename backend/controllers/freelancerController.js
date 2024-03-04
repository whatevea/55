import asyncHandler from 'express-async-handler';
import Applied_Vacancy from '../models/applied_vacancy';


const apply_job = asyncHandler(async (req, res) => {
    const { job, user_id, cover_letter, offered_amount, attachment_url } = req.body;


})
