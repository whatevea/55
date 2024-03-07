import React from 'react'
import { useState } from 'react';
import { uploadFile } from '../../config/http'
export default function Fileupload() {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (file) {
            try {
                const response = await uploadFile(file);
                console.log(response.data);
            } catch (error)
            {
                console.error('Error during file upload:', error);

            }
        }
    };
    return (
        <div>

            Hello from fileuploadasa
            Hello from fileuploadasaHello from fileuploadasa
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}
