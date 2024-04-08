// import { useEffect, useState } from "react";
// import { MdHelp } from "react-icons/md";

// const Title = ({ setIsValid, updateJobData, jobData }) => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("Product"); // State to track selected option
//   const [selectedUniversity, setSelectedUniversity] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");

//   const handleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleOptionSelect = (option) => {
//     setCategory(option);
//     updateJobData({
//       category: option,
//       // title,
//       // university: selectedUniversity,
//       // class: selectedClass,
//     });
//   };

//   const handleUniversityChange = (event) => {
//     setSelectedUniversity(event.target.value);
//   };

//   const handleClassChange = (event) => {
//     setSelectedClass(event.target.value);
//   };

//   useEffect(() => {
//     const isValid =
//       category &&
//       title.trim().length > 0 &&
//       selectedUniversity &&
//       selectedClass;
//     setIsValid(isValid);
//   }, [category, title, selectedUniversity, selectedClass]);

//   useEffect(() => {
//     const isValid =
//       // category &&
//       title.trim().length > 0 && selectedUniversity && selectedClass;
//     if (isValid) {
//       updateJobData({
//         title: title,
//         category: category,
//         user_university: selectedUniversity,
//         user_class: selectedClass,
//       });
//     }
//   }, [category, title, selectedUniversity, selectedClass]);

//   useEffect(() => {
//     setTitle(jobData.title || "");
//     setCategory(jobData.category || "Service");
//     setSelectedUniversity(jobData.user_university || "");
//     setSelectedClass(jobData.user_class || "");
//   }, [jobData]);

//   return (
//     <div className="flex flex-col gap-3 w-full justify-center">
//       <label className="text-xl font-bold text-center text-green-600">
//         Are You Building Product Or Service? Please Select One
//       </label>
//       <div className="text-center flex justify-center gap-4">
//         <span>
//           <button
//             className={`rounded-md px-3 py-1.5 font-semibold ${
//               category === "Product" // Conditional styling based on selected option
//                 ? "bg-green-600 text-white" // Green background and white text when selected
//                 : "border-2 border-green-600"
//             }`}
//             onClick={() => handleOptionSelect("Product")} // Update selected option when clicked
//           >
//             Product
//           </button>
//         </span>
//         <span>
//           <button
//             className={`rounded-md px-3 py-1.5 font-semibold ${
//               category === "Service" // Conditional styling based on selected option
//                 ? "bg-green-600 text-white" // Green background and white text when selected
//                 : "border-2 border-green-600"
//             }`}
//             onClick={() => handleOptionSelect("Service")} // Update selected option when clicked
//           >
//             Service
//           </button>
//         </span>
//       </div>

//       <label className="text-xl font-bold text-center text-green-600">
//         Please Select University And Class
//       </label>

//       <div className="space-y-4">
//         <label className="block w-[80%] mx-auto">
//           <span className="text-base font-semibold dark:text-zinc-300">
//             University:
//           </span>
//           <select
//             className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black"
//             value={selectedUniversity}
//             onChange={handleUniversityChange}
//           >
//             <option value="" className="bg-white" disabled>
//               Select University
//             </option>
//             <option value="Mumbai University" className="bg-white">
//               Mumbai University
//             </option>
//             <option value="Amity University" className="bg-white">
//               Amity University
//             </option>
//             <option value="Lovely Professional University" className="bg-white">
//               Lovely Professional University
//             </option>
//             {/* Add more <option> tags here for other universities */}
//           </select>
//         </label>
//         <label className="block w-[80%] mx-auto">
//           <span className="text-base font-semibold dark:text-zinc-300">
//             Class:
//           </span>
//           <select
//             className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black appearance-none"
//             value={selectedClass}
//             onChange={handleClassChange}
//           >
//             <option value="" className="bg-white" disabled>
//               Select Class
//             </option>
//             <option value="12th Class" className="bg-white">
//               12th Class
//             </option>
//             <option value="11th Class" className="bg-white">
//               11th Class
//             </option>
//             <option value="10th Class" className="bg-white">
//               10th Class
//             </option>

//             {/* Add more <option> tags here for other classes */}
//           </select>
//         </label>
//       </div>

//       <p className="font-semibold w-[80%] mx-auto">
//         <span className="flex items-center gap-1">
//           <span>
//             Write a title for your {category || "Product or Service"} Post.{" "}
//           </span>
//           <span className="inline">
//             <MdHelp className="text-green-600" />
//           </span>
//         </span>
//       </p>
//       <input
//         type="text"
//         onChange={handleChange}
//         value={title} // This ensures the input is controlled
//         placeholder="Enter a title for your product or service" // Provide a placeholder to guide the user
//         className="rounded-md p-2 w-[80%] border-2 focus:border-green-600 outline-none mx-auto bg-green-50"
//       />
//       {/* Examples start */}
//       <div>
//         <p className="font-semibold text-center"> Example titles </p>
//         <ul className="list-none text-center">
//           <li>Detailed Lecture Notes for College Biology Course</li>
//           <li>Online Tutoring Sessions for High School Chemistry</li>
//           <li>Prepare Study Guides for College Physics Exams</li>
//         </ul>
//         {/* Examples end */}
//       </div>
//     </div>
//   );
// };

// export default Title;

import { useEffect, useState } from "react";
import { MdHelp } from "react-icons/md";

const Title = ({ setIsValid, updateJobData, jobData }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Product"); // State to track selected option
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showExamples, setShowExamples] = useState(false); // State to control visibility of examples section

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setCategory(option);
    updateJobData({
      category: option,
    });
  };

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  useEffect(() => {
    const isValid =
      category &&
      title.trim().length > 0 &&
      selectedUniversity &&
      selectedClass;
    setIsValid(isValid);
  }, [category, title, selectedUniversity, selectedClass]);

  useEffect(() => {
    const isValid =
      // category &&
      title.trim().length > 0 && selectedUniversity && selectedClass;
    if (isValid) {
      updateJobData({
        title: title,
        category: category,
        user_university: selectedUniversity,
        user_class: selectedClass,
      });
    }
  }, [category, title, selectedUniversity, selectedClass]);

  useEffect(() => {
    setTitle(jobData.title || "");
    setCategory(jobData.category || "Service");
    setSelectedUniversity(jobData.user_university || "");
    setSelectedClass(jobData.user_class || "");
  }, [jobData]);

  return (
    <div className="flex flex-col gap-3 w-full justify-center">
      <label className="text-xl font-bold text-center text-green-600">
        Are You Building Product Or Service? Please Select One
      </label>
      <div className="text-center flex justify-center gap-4">
        <span>
          <button
            className={`rounded-md px-3 py-1.5 font-semibold ${
              category === "Product" // Conditional styling based on selected option
                ? "bg-green-600 text-white" // Green background and white text when selected
                : "border-2 border-green-600"
            }`}
            onClick={() => handleOptionSelect("Product")} // Update selected option when clicked
          >
            Product
          </button>
        </span>
        <span>
          <button
            className={`rounded-md px-3 py-1.5 font-semibold ${
              category === "Service" // Conditional styling based on selected option
                ? "bg-green-600 text-white" // Green background and white text when selected
                : "border-2 border-green-600"
            }`}
            onClick={() => handleOptionSelect("Service")} // Update selected option when clicked
          >
            Service
          </button>
        </span>
      </div>

      <label className="text-xl font-bold text-center text-green-600">
        Please Select University And Class
      </label>

      <div className="space-y-4">
        <label className="block w-[80%] mx-auto">
          <span className="text-base font-semibold dark:text-zinc-300">
            University:
          </span>
          <select
            className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black"
            value={selectedUniversity}
            onChange={handleUniversityChange}
          >
            <option value="" className="bg-white" disabled>
              Select University
            </option>
            <option value="Mumbai University" className="bg-white">
              Mumbai University
            </option>
            <option value="Amity University" className="bg-white">
              Amity University
            </option>
            <option value="Lovely Professional University" className="bg-white">
              Lovely Professional University
            </option>
            {/* Add more <option> tags here for other universities */}
          </select>
        </label>
        <label className="block w-[80%] mx-auto">
          <span className="text-base font-semibold dark:text-zinc-300">
            Class:
          </span>
          <select
            className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black appearance-none"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="" className="bg-white" disabled>
              Select Class
            </option>
            <option value="12th Class" className="bg-white">
              12th Class
            </option>
            <option value="11th Class" className="bg-white">
              11th Class
            </option>
            <option value="10th Class" className="bg-white">
              10th Class
            </option>

            {/* Add more <option> tags here for other classes */}
          </select>
        </label>
      </div>

      <p className="font-semibold w-[80%] mx-auto">
        <span className="flex items-center gap-1">
          <span>
            Write a title for your {category || "Product or Service"} Post.{" "}
          </span>
          <span onClick={() => setShowExamples(!showExamples)}>
            <MdHelp className="text-green-600 cursor-pointer" />
          </span>
        </span>
      </p>
      <input
        type="text"
        onChange={handleChange}
        value={title} // This ensures the input is controlled
        placeholder="Enter a title for your product or service" // Provide a placeholder to guide the user
        className="rounded-md p-2 w-[80%] border-2 focus:border-green-600 outline-none mx-auto bg-green-50"
      />
      {/* Examples start */}
      {showExamples && (
        <div className="bg-green-50 p-4 rounded-md w-[80%] mx-auto">
          <p className="font-semibold"> Example titles </p>
          <ol className="list-none">
            <li>1. Detailed Lecture Notes for College Biology Course</li>
            <li>2 .Online Tutoring Sessions for High School Chemistry</li>
            <li>3. Prepare Study Guides for College Physics Exams</li>
          </ol>
          {/* Examples end */}
        </div>
      )}
    </div>
  );
};

export default Title;
