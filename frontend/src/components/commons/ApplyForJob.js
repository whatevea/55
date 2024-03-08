import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../config/http';
import moment from 'moment';
import { toast } from "react-toastify";
import { toastConfig } from "../../config/toastConfig";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPaperclip, FaTimes } from "react-icons/fa";
import { uploadFile } from "../../config/http";
import { useRef } from 'react';
const ApplyForJob = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.User);
    const [coverLetterError, setCoverLetterError] = useState(false);
    const [hourlyRateError, setHourlyRateError] = useState(false);
    const [isCoverLetterFocused, setCoverLetterFocused] = useState(false);
    const [isHourlyRateFocused, setHourlyRateFocused] = useState(false);
    const [isNumericError, setNumericError] = useState(false);
    const params = useParams();
    const [jobPost, setJobPost] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [hourlyOrFixedRate, setHourlyOrFixedRate] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const formattedCreatedAt = moment(jobPost?.createdAt).fromNow();
    useEffect(() => {
        const fetchJobPost = async () => {
            try {
                const response = await http.get(`/hire/singleJobPost/${params.id}`);
                setJobPost(response.data.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPost();
    }, [params.id]);

    const handleFileChange = async (event) => {
        const files = event.target.files;
        console.log('file is', files);
        for (const file of files) {
            try {
                const response = await uploadFile(file);
                const uploadedFileUrl = response.data.fileUrl;
                setUploadedFiles(prevFiles => [...prevFiles, { file, fileUrl: uploadedFileUrl }]);
            } catch (error) {
                console.error('Error during file upload:', error);
            }
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        // Validate cover letter, hourly rate, and file attachment

        if (isNaN(hourlyOrFixedRate)) {
            toast.error("Please enter a valid number for Hourly Rate or Fixed Rate", toastConfig);
            setNumericError(true);
            return;
        }

        if (!coverLetter.trim() || !hourlyOrFixedRate.trim()) {
            toast.error("Cover Letter, Hourly Rate Cannot Be Empty", toastConfig);

            // Highlight the fields with errors
            setCoverLetterError(!coverLetter.trim());
            setHourlyRateError(!hourlyOrFixedRate.trim());
            return;
        }

        // Reset error states on successful submission
        setCoverLetterError(false);
        setHourlyRateError(false);
        setCoverLetterFocused(false);
        setHourlyRateFocused(false);
        setNumericError(false);

        const requestData = {
            job: jobPost._id,
            user_id: userData.userData._id,
            cover_letter: coverLetter,
            offered_amount: hourlyOrFixedRate,
        };

        if (uploadedFiles.length > 0) {
            requestData.attachment_urls = uploadedFiles.map(file => file.fileUrl);
        }

        try {
            const req = await http.post('/hire/applyingforJob', requestData, { timeout: 5000 });

            toast.success("Job Applied Successfully", toastConfig);
            navigate("/");
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <div className="rounded-lg shadow-md p-4 w-3/4 mx-auto h-[fit-content] mt-4 bg-green-50">
            <div className='text-sm'>
                Posted: {formattedCreatedAt}
            </div>
            <h2 className="text-2xl text-green-600 font-medium mb-2">{jobPost?.title}</h2>
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
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobPost?.budgetType}</span>
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>${jobPost?.budgetFixed}</span>
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                            <span className='capitalize inline-block font-bold mx-1 text-sm'>Experience: {jobPost?.scopeExperience}</span>
                        </div>
                    )
                }
            </div>
            <div className="text-gray-700 mb-4 break-words">
                {jobPost?.description}
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4 mb-4">
                {jobPost?.skills_required?.map((skill) => (
                    <span key={skill} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {skill}
                    </span>
                ))}
            </div>
            <div className="text-gray">
                {
                    jobPost?.attachmentUrls?.map((item) => (<div> <a href={item}>{item.split("uploads/")[1]}</a> </div>))
                }
            </div>
            <form onSubmit={formSubmit} className='mb-4'>
                <div className={`flex flex-col gap-2 ${isCoverLetterFocused ? 'focus-within:border-green-600' : ''}`}>
                    <label className='font-bold text-green-600'>Cover Letter</label>
                    <textarea
                        className={`p-2 focus:outline-none focus:ring-1 focus:ring-green-600 ${coverLetterError ? 'border border-red-500' : ''}`}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        onFocus={() => { setCoverLetterFocused(true); setCoverLetterError(false); }}
                        onBlur={() => setCoverLetterFocused(false)}
                        name="cover_letter"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <div className={`mb-4 mt-4 ${isHourlyRateFocused ? 'focus-within:border-green-600' : ''}`}>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-green-600'>{jobPost?.budgetType === 'hourly' ? 'Hourly Rate' : 'Fixed Rate'}</label>
                        <input
                            className={`p-2 focus:outline-none focus:ring-1 focus:ring-green-600 ${hourlyRateError || isNumericError ? 'border border-red-500' : ''}`}
                            type='text'
                            value={hourlyOrFixedRate}
                            onChange={(e) => setHourlyOrFixedRate(e.target.value)}
                            onFocus={() => { setHourlyRateFocused(true); setHourlyRateError(false); setNumericError(false); }}
                            onBlur={() => setHourlyRateFocused(false)}
                        />
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <label className='font-bold text-green-600'>File Attachment(s)</label>
                    <div>
                        <FaPaperclip
                            className="text-xl text-green-600 inline ml-4 cursor-pointer"
                            onClick={handleFileUpload}
                        />
                        <input
                            className='p-2 '
                            type="file"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
                                {file.file.name}
                            </a>
                            <FaTimes className="text-red-500 cursor-pointer" onClick={() => handleRemoveFile(index)} />
                        </div>
                    ))}
                </div>
                <button type='submit' className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default ApplyForJob;