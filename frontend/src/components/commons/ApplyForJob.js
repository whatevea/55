import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../config/http';
import moment from 'moment'
import { useSelector } from 'react-redux';

const ApplyForJob = () => {

  const userData = useSelector((state)=>state.User)
  const params = useParams()
  const [jobPost, setJobPost] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [hourlyOrFixedRate, setHourlyOrFixedRate] = useState('');
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
});

  const skills = jobPost?.skills_required
  const formattedCreatedAt = moment(jobPost?.createdAt).fromNow();
  

  const handleFileChange = (e) => {
    // Handle file changes and update the state
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

  };

  const formSubmit = async (e) => {
    e.preventDefault()
    console.log('we are here');
    try {
      await http.post('/applyingforJob', {
        job: jobPost._id,
        user_id: userData.userData._id,
        cover_letter: coverLetter,
        offered_amount: hourlyOrFixedRate,
        attachment_url: ""

      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // Function to fetch job posts from the backend
    const fetchJobPost = async () => {
      try {
        const response = await http.get(`/hire/singleJobPost/${params.id}`);
        setJobPost(response.data.data); // Assuming the response contains job posts data
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPost(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="rounded-lg shadow-md p-4 w-3/4 mx-auto h-[fit-content] mt-4 bg-green-50">
      <div className='text-sm'>
        Posted: {formattedCreatedAt}
      </div>
      <h2 className="text-2xl font-medium mb-2">{jobPost?.title}
      </h2>
      <div className='mb-2'>
        {
          jobPost?.budgetType === 'hourly' ?
            (
              <div>
                <span className='capitalize inline-block font-bold mx-1 text-sm'>{jobPost?.budgetType}</span>: <span className='capitalize inline-block mx-1 font-bold text-sm'>${jobPost?.budgetHourlyMin}</span>-<span className='capitalize inline-block font-bold mx-1 text-sm'>${jobPost?.budgetHourlyMax}</span>
                <span className='capitalize inline-block font-bold mx-1 text-sm'>Duration: {jobPost?.scopeDuration}</span>
                <span className='capitalize inline-block mx-1 font-bold text-sm'>Experience: {jobPost.scopeExperience}</span>
              </div>)
            :
            (
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
        {skills?.map((skill) => (
          <span key={skill} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {skill}
          </span>
        ))}
        {/* <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">JavaScript</span> */}

      </div>
      <form onSubmit={formSubmit} className='mb-4'>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Cover Letter</label>
          <textarea onChange={(e)=>{setCoverLetter(e.target.value)}} name="cover_letter" id="" cols="30" rows="10"></textarea>
        </div>
        <div className='mb-4'>
          <div className='flex flex-col gap-2'>
            {jobPost?.budgetType === 'hourly' ? (<>
              <label className='font-bold'>Hourly</label>
              
            </>
            ) : (<>
              <label className='font-bold'>Fixed</label>
            </>
            )}
            <input
            type='text'
            value={hourlyOrFixedRate}
            onChange={(e) => setHourlyOrFixedRate(e.target.value)}
          />
          </div>
        </div>
        <div className='flex flex-col mb-4'>
          <label className='font-bold'>File Attachment</label>
          <input type='file' multiple onChange={handleFileChange} />
        </div>
        <button type='submit' className="px-3 py-1 bg-green-600 text-white text-base font-semibold rounded-md hover:bg-green-500">
        Apply Now
      </button>
      </form>

      
    </div>
  );
};

export default ApplyForJob;