import { useState } from "react";
import { uploadFile } from "../../config/http";

const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = async (files) => {
    try {
      const uploadedFilesPromises = Array.from(files).map(async (file) => {
        const response = await uploadFile(file);
        const uploadedFileUrl = response.data.fileUrl;
        return { file, fileUrl: uploadedFileUrl };
      });

      const newUploadedFiles = await Promise.all(uploadedFilesPromises);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
      return newUploadedFiles;
    } catch (error) {
      console.error("Error during file upload:", error);
      return [];
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return { uploadedFiles, handleFileChange, removeFile };
};

export default useFileUpload;
