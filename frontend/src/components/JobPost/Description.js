import { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { uploadFile } from "../../config/http";

const Description = ({ setIsValid, updateJobData, jobData }) => {
  console.log("jobData is", jobData);

  const fileInputRef = useRef(null);
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const changeDes = (text, files = uploadedFiles) => {
    const isValidDescription = text.length > 20;
    const isValidFiles = files.length > 0;
    setIsValid(isValidDescription && isValidFiles);
    updateJobData({
      description: {
        text: text,
        attachmentUrls: files.map((file) => file.fileUrl),
      },
    });
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    try {
      const uploadedFilesPromises = Array.from(files).map(async (file) => {
        const response = await uploadFile(file);
        const uploadedFileUrl = response.data.fileUrl;
        return { file, fileUrl: uploadedFileUrl };
      });

      const newUploadedFiles = await Promise.all(uploadedFilesPromises);

      setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);

      // Call changeDes with the updated description text and files
      changeDes(description, [...uploadedFiles, ...newUploadedFiles]);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Call changeDes with the updated description text and files
    changeDes(
      description,
      uploadedFiles.filter((_, i) => i !== index)
    );
  };

  // Call changeDes when the description text changes
  useEffect(() => {
    changeDes(description);
  }, [description]);

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">
        Describe About your{" "}
        {jobData?.category === "Product" ? "Product" : "Service"}
      </p>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        cols="30"
        rows="5"
        placeholder="Already have a description? Paste it here"
        className=" outline-none border-2 focus:border-green-600 p-4 rounded-md"
      />
      <div>
        <p className="font-semibold inline">
          Attach your file(s){" "}
          <span className="text-sm font-bold italic text-green-600">
            This field is mandatory Please attach atleast one file
          </span>
        </p>
        <FaPaperclip
          className="font-extrabold inline ml-4 text-xl text-green-600 cursor-pointer"
          onClick={handleFileUpload}
        />
        <input
          className="border-2 border-solid border-red-400"
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
      </div>
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center gap-2">
          <a
            href={file.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            {file.file.name}
          </a>
          <FaTimes
            className="text-green-600 cursor-pointer"
            onClick={() => handleRemoveFile(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Description;
