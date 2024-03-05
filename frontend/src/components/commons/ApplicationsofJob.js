import React, { useEffect, useState } from 'react';
import http from "../../config/http";
import { useParams } from 'react-router-dom';

export default function ApplicationsOfJob() {
    const { job_id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // If job_id from params should be used, replace the hardcoded job_id below
                const req = await http.post("hire/getappliers/", { job_id: job_id });
                if (req.data && req.data.data) {
                    setData(req.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Handle errors or set some error state to show a message
            }
        }
        fetchData();
    }, [job_id]); // Depend on job_id so if it changes, re-fetch data

    return (
        <div>
            {data.length > 0 ? (
                data.map(item => (
                    <div key={item._id}>
                        <p>Attachment Url: {item.attachment_url}</p>
                        <p>Cover Letter: {item.cover_letter}</p>
                        <p>Offered Amount: {item.offered_amount}</p>
                    </div>
                ))
            ) : (
                <p>No applications found for this job.</p>
            )}
        </div>
    );
}
