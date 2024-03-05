import asyncHandler from 'express-async-handler';
import Applied_Vacancy from '../models/applied_vacancy.js';


const apply_job = asyncHandler(async (req, res) => {
    const { job, user_id, cover_letter, offered_amount, attachment_url } = req.body;

    await Applied_Vacancy.create({

        job: job, user_id: user_id, cover_letter: cover_letter, offered_amount: offered_amount, attachment_url: attachment_url

    })

})
export default apply_job
