import { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import { uploadFile } from "../../config/http";

const Description = ({ setIsValid, updateJobData, jobData }) => {
  console.log("jobData is", jobData);

  const fileInputRef = useRef(null);
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const changeDes = (text, files = uploadedFiles) => {
    // setDescription(text);
    setIsValid(text.length > 10);
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
        {jobData?.selectedOption === "Produce" ? "Product" : "Service"}
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
        <p className="font-semibold inline">Attach your file(s)</p>
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

// import { useState, useRef, useEffect } from "react";
// import { FaPaperclip, FaTimes } from "react-icons/fa";
// import { uploadFile } from "../../config/http";

// const Description = ({ setIsValid, updateJobData, jobData }) => {
//   const fileInputRef = useRef(null);
//   const [description, setDescription] = useState(
//     jobData?.description?.text || ""
//   );
//   const [uploadedFiles, setUploadedFiles] = useState(
//     jobData?.description?.attachmentUrls || []
//   );

//   const [rawAttachedFilesArray, setRawAttachedFilesArray] = useState([]);

//   const changeDes = (text, files = uploadedFiles) => {
//     setIsValid(text.length > 10);
//     updateJobData({
//       description: {
//         text: text,
//         attachmentUrls: files.map((file) => file.fileUrl),
//       },
//     });
//   };

//   const handleFileChange = async (event) => {
//     const files = event.target.files;

//     console.log("files is", files);

//     try {
//       const uploadedFilesPromises = Array.from(files).map(async (file) => {
//         const response = await uploadFile(file);
//         const uploadedFileUrl = response.data.fileUrl;
//         return { file, fileUrl: uploadedFileUrl };
//       });

//       const newUploadedFiles = await Promise.all(uploadedFilesPromises);

//       setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
//       setRawAttachedFilesArray((prevFiles) => [...prevFiles, ...files]);

//       // Call changeDes with the updated description text and files
//       changeDes(description, [...uploadedFiles, ...newUploadedFiles]);
//     } catch (error) {
//       console.error("Error during file upload:", error);
//     }
//   };

//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   //   const handleRemoveFile = (index) => {
//   //     setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

//   //     // Call changeDes with the updated description text and files
//   //     changeDes(
//   //       description,
//   //       uploadedFiles.filter((_, i) => i !== index)
//   //     );
//   //   };

//   const handleRemoveFile = (index) => {
//     setUploadedFiles((prevFiles) => {
//       const updatedFiles = prevFiles.filter((_, i) => i !== index);
//       changeDes(description, updatedFiles);
//       return updatedFiles;
//     });

//     setRawAttachedFilesArray((prevFiles) => {
//       const updatedRawFiles = prevFiles.filter((_, i) => i !== index);
//       return updatedRawFiles;
//     });
//   };

//   // Call changeDes when the description text changes
//   useEffect(() => {
//     changeDes(description);
//   }, [description]);

//   return (
//     <div className="flex flex-col gap-3">
//       <p className="font-semibold">
//         Describe About your{" "}
//         {jobData?.selectedOption === "Produce" ? "Product" : "Service"}
//       </p>
//       <textarea
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//         cols="30"
//         rows="5"
//         placeholder="Already have a description? Paste it here"
//         className=" outline-none border-2 focus:border-green-600 p-4 rounded-md"
//       />
//       <div>
//         <p className="font-semibold inline">Attach your file(s)</p>
//         <FaPaperclip
//           className="font-extrabold inline ml-4 text-xl text-green-600 cursor-pointer"
//           onClick={handleFileUpload}
//         />
//         <input
//           className="border-2 border-solid border-red-400"
//           type="file"
//           style={{ display: "none" }}
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           multiple
//         />
//       </div>
//       {uploadedFiles.map((file, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <a
//             href={file.fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm"
//           >
//             {file?.file?.name}
//           </a>
//           <FaTimes
//             className="text-green-600 cursor-pointer"
//             onClick={() => handleRemoveFile(index)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Description;

// import { useState, useRef, useEffect } from "react";
// import { FaPaperclip, FaTimes } from "react-icons/fa";
// import { uploadFile } from "../../config/http";

// const Description = ({ setIsValid, updateJobData, jobData }) => {
//   const fileInputRef = useRef(null);
//   const [description, setDescription] = useState(
//     jobData?.description?.text || ""
//   );
//   const [uploadedFiles, setUploadedFiles] = useState(
//     jobData?.description?.attachmentUrls || []
//   );

//   const [rawAttachedFilesArray, setRawAttachedFilesArray] = useState([]);

//   const changeDes = (text, files = uploadedFiles) => {
//     setIsValid(text.length > 10);
//     updateJobData({
//       description: {
//         text: text,
//         attachmentUrls: files.map((file) => file.fileUrl),
//       },
//     });
//   };

//   const handleFileChange = async (event) => {
//     const files = event.target.files;

//     console.log("files is", files);

//     try {
//       const uploadedFilesPromises = Array.from(files).map(async (file) => {
//         const response = await uploadFile(file);
//         const uploadedFileUrl = response.data.fileUrl;
//         return { file, fileUrl: uploadedFileUrl };
//       });

//       const newUploadedFiles = await Promise.all(uploadedFilesPromises);

//       setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
//       setRawAttachedFilesArray((prevFiles) => [...prevFiles, ...files]);

//       // Call changeDes with the updated description text and files
//       changeDes(description, [...uploadedFiles, ...newUploadedFiles]);
//     } catch (error) {
//       console.error("Error during file upload:", error);
//     }
//   };

//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   //   const handleRemoveFile = (index) => {
//   //     setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

//   //     // Call changeDes with the updated description text and files
//   //     changeDes(
//   //       description,
//   //       uploadedFiles.filter((_, i) => i !== index)
//   //     );
//   //   };

//   const handleRemoveFile = (index) => {
//     setUploadedFiles((prevFiles) => {
//       const updatedFiles = prevFiles.filter((_, i) => i !== index);
//       changeDes(description, updatedFiles);
//       return updatedFiles;
//     });

//     setRawAttachedFilesArray((prevFiles) => {
//       const updatedRawFiles = prevFiles.filter((_, i) => i !== index);
//       return updatedRawFiles;
//     });
//   };

//   // Call changeDes when the description text changes
//   useEffect(() => {
//     changeDes(description);
//   }, [description]);

//   return (
//     <div className="flex flex-col gap-3">
//       <p className="font-semibold">
//         Describe About your{" "}
//         {jobData?.selectedOption === "Produce" ? "Product" : "Service"}
//       </p>
//       <textarea
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//         cols="30"
//         rows="5"
//         placeholder="Already have a description? Paste it here"
//         className=" outline-none border-2 focus:border-green-600 p-4 rounded-md"
//       />
//       <div>
//         <p className="font-semibold inline">Attach your file(s)</p>
//         <FaPaperclip
//           className="font-extrabold inline ml-4 text-xl text-green-600 cursor-pointer"
//           onClick={handleFileUpload}
//         />
//         <input
//           className="border-2 border-solid border-red-400"
//           type="file"
//           style={{ display: "none" }}
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           multiple
//         />
//       </div>
//       {uploadedFiles.map((file, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <a
//             href={file.fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm"
//           >
//             {file?.file?.name}
//           </a>
//           <FaTimes
//             className="text-green-600 cursor-pointer"
//             onClick={() => handleRemoveFile(index)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Description;
