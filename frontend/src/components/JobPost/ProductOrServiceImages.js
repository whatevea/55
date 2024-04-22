import React, { useEffect, useRef } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import useFileUpload from "./useFileUpload";

const ProductOrServiceImages = ({ setIsValid, updateJobData, jobData }) => {
  const fileInputRef = useRef(null);
  const { uploadedFiles, handleFileChange, removeFile } = useFileUpload();

  console.log("jobData is:", jobData);

  // Set setIsValid to false when the component mounts
  useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  // Initialize imagesUrl as an empty array if it doesn't exist in jobData
  useEffect(() => {
    if (!jobData.imagesUrl) {
      updateJobData({ imagesUrl: [] });
    }
  }, [jobData, updateJobData]);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  //   const handleFileInputChange = async (event) => {
  //     const files = event.target.files;
  //     const newUploadedFiles = await handleFileChange(files);

  //     // Extract filenames from newUploadedFiles
  //     const filenames = newUploadedFiles.map((file) => file.fileUrl);

  //     // Initialize imagesUrl as an array if it's not already
  //     const updatedImagesUrl = Array.isArray(jobData.imagesUrl)
  //       ? jobData.imagesUrl
  //       : [];

  //     // Call updateJobData with the new filenames
  //     updateJobData({ imagesUrl: [...updatedImagesUrl, ...filenames] });
  //     setIsValid(filenames.length > 0);
  //   };

  const handleFileInputChange = async (event) => {
    const files = event.target.files;

    console.log("files is", files);

    const newUploadedFiles = await handleFileChange(files);

    // Extract filenames from newUploadedFiles
    const filenames = newUploadedFiles.map((file) => file.fileUrl);

    // Call updateJobData with the new filenames
    if (filenames.length > 0) {
      updateJobData({ imagesUrl: [...jobData.imagesUrl, ...filenames] });
      setIsValid(true);
    } else {
      updateJobData({ imagesUrl: [] });
      setIsValid(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Please Upload Images for the{" "}
        {jobData.category === "Product" ? "Product" : "Service"}
      </h1>
      <label className="text-black text-base font-semibold">
        Select Images:{" "}
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <FaPaperclip
        className="font-extrabold inline ml-4 text-xl text-green-600 cursor-pointer"
        onClick={handleFileUpload}
      />
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center gap-2">
          <p>{file.file.name}</p>
          <FaTimes
            className="text-green-600 cursor-pointer"
            onClick={() => removeFile(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductOrServiceImages;

// import React, { useEffect, useRef } from "react";
// import { FaPaperclip, FaTimes } from "react-icons/fa";
// import useFileUpload from "./useFileUpload";

// const ProductOrServiceImages = ({ setIsValid, updateJobData, jobData }) => {
//   const fileInputRef = useRef(null);
//   const { uploadedFiles, handleFileChange, removeFile } = useFileUpload();

//   // Set setIsValid to false when the component mounts
//   useEffect(() => {
//     setIsValid(false);
//   }, [setIsValid]);

//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileInputChange = async (event) => {
//     const files = event.target.files;
//     const newUploadedFiles = await handleFileChange(files);

//     // Extract filenames from newUploadedFiles
//     const filenames = newUploadedFiles.map((file) => file.fileUrl);

//     // Update the imagesUrl in the jobData object
//     const updatedJobData = {
//       ...jobData,
//       imagesUrl: [...(jobData.imagesUrl || []), ...filenames],
//     };

//     updateJobData(updatedJobData);
//     setIsValid(filenames.length > 0);
//   };

//   const handleRemoveFile = (index) => {
//     const updatedFilenames = [...(jobData.imagesUrl || [])];
//     updatedFilenames.splice(index, 1);

//     const updatedJobData = {
//       ...jobData,
//       imagesUrl: updatedFilenames,
//     };

//     updateJobData(updatedJobData);
//     setIsValid(updatedFilenames.length > 0);
//   };

//   console.log("jobData is", jobData);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4 text-green-600">
//         Please Upload Images for the{" "}
//         {jobData.category === "Product" ? "Product" : "Service"}
//       </h1>
//       <label className="text-black text-base font-semibold">
//         Select Images:{" "}
//       </label>
//       <input
//         type="file"
//         multiple
//         onChange={handleFileInputChange}
//         ref={fileInputRef}
//         style={{ display: "none" }}
//       />
//       <FaPaperclip
//         className="font-extrabold inline ml-4 text-xl text-green-600 cursor-pointer"
//         onClick={handleFileUpload}
//       />
//       {(jobData.imagesUrl || []).map((filename, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <p>{filename}</p>
//           <FaTimes
//             className="text-green-600 cursor-pointer"
//             onClick={() => handleRemoveFile(index)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductOrServiceImages;
