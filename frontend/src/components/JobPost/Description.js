import { useState, useRef } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import { uploadFile } from "../../config/http";

const Description = ({ setIsValid, updateJobData }) => {
    const fileInputRef = useRef(null);
    const [description, setDescription] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const changeDes = (text) => {
        setDescription(text);
        setIsValid(text.length > 10);
        updateJobData({
            "description": {
                text: text,
                attachmentUrls: uploadedFiles.map(file => file.fileUrl)
            }
        });
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
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

    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold">Describe what you need</p>
            <textarea
                onChange={(e) => changeDes(e.target.value)}
                value={description}
                cols="30"
                rows="5"
                placeholder="Already have a description? Paste it here"
                className="sm:w-1/2 outline-none border p-4 rounded-md"
            />
            <div>
                <p className="font-semibold inline">Attach your file(s)</p>
                <FaPaperclip
                    className="font-extrabold text-2xl inline ml-4 cursor-pointer"
                    onClick={handleFileUpload}
                />
                <input
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
    );
};

export default Description;