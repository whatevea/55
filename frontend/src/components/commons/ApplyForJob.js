import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../config/http'; // Ensure this is set up to make HTTP requests
import moment from 'moment';
import { toast } from "react-toastify"
import { toastConfig } from "../../config/toastConfig"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ApplyForJob = () => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.User);
    const params = useParams();
    const [jobPost, setJobPost] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [hourlyOrFixedRate, setHourlyOrFixedRate] = useState('');
    const [files, setFiles] = useState([]);

    const formattedCreatedAt = moment(jobPost?.createdAt).fromNow();

    useEffect(() => {
        const fetchJobPost = async () => {
            try {
                const response = await http.get(`/hire/singleJobPost/${params.id}`);
                setJobPost(response.data.data); // Assuming response structure. Adjust as needed.
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPost();
    }, [params.id]);



    const formSubmit = async (e) => {
        e.preventDefault();

        // Validate cover letter, hourly rate, and file attachment
        if (!coverLetter.trim() || !isNumeric(hourlyOrFixedRate) || files.length === 0) {
            toast.error("Cover Letter, Hourly Rate (must be a number), and File Attachment cannot be empty", toastConfig);
            return; // Prevent further execution if validation fails
        }

        // Function to check if a value is a valid number
        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }

        try {

            const req = await http.post('/hire/applyingforJob', {
                job: jobPost._id,
                user_id: userData.userData._id,
                cover_letter: coverLetter,
                offered_amount: hourlyOrFixedRate,
                // Adjusted to send a single URL
                attachment_url: "attachmentUrl",
            }, { timeout: 500 });

            toast.success("Job Applied Successfully", toastConfig)
            navigate("/")
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };


    return (
        <div className="rounded-lg shadow-md p-4 w-3/4 mx-auto h-[fit-content] mt-4 bg-green-50">
            <div className='text-sm'>
                Posted: {formattedCreatedAt}
            </div>
            <h2 className="text-2xl font-medium mb-2">{jobPost?.title}</h2>
            <div className='mb-2'>
                {
                    jobPost?.budgetType === 'hourly' ? (
                        <div>
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobPost?.budgetType}</span>: <span className='capitalize inline-block mx-1 font-bold text-sm'>${jobPost?.budgetHourlyMin}</span>-<span className='capitalize inline-block font-bold mx-1 text-sm'>${jobPost?.budgetHourlyMax}</span>
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                            <span className='capitalize inline-block mx-1 font-bold text-sm'>Experience: {jobPost?.scopeExperience}</span>
                        </div>
                    ) : (
                        <div>
                            <span className='capitalize inline-block mx-1 text-sm'>{jobPost?.budgetType}</span>
                            <span className='capitalize inline-block mx-1 text-sm'>${jobPost?.budgetFixed}</span>
                            <span className='capitalize inline-block mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                            <span className='capitalize inline-block mx-1 text-sm'>Experience: {jobPost?.scopeExperience}</span>
                        </div>
                    )
                }
            </div>
            <div className="text-gray-700 mb-4 break-words">
                {jobPost?.description}
            </div>
            <div className="flex mt-4 mb-4">
                {jobPost?.skills_required?.map((skill) => (
                    <span key={skill} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {skill}
                    </span>
                ))}
            </div>
            <form onSubmit={formSubmit} className='mb-4'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold'>Cover Letter</label>
                    <textarea onChange={(e) => setCoverLetter(e.target.value)} name="cover_letter" cols="30" rows="10"></textarea>
                </div>
                <div className='mb-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold'>{jobPost?.budgetType === 'hourly' ? 'Hourly Rate' : 'Fixed Rate'}</label>
                        <input
                            type='text'
                            value={hourlyOrFixedRate}
                            onChange={(e) => setHourlyOrFixedRate(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <label className='font-bold'>File Attachment</label>
                    <input type='file'
                    />
                </div>
                <button type='submit' className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default ApplyForJob;
