// import { useEffect, useState } from "react";
// import { FaSearch, FaStar, FaPlus, FaTimes } from "react-icons/fa";
// import CreateSelectOption from "../commons/CreateSelectTable";

// const Skill = ({ setIsValid, updateJobData }) => {
//   const [skills, setSkills] = useState([]);
//   const [userTypedSkills, setUserTypedSkills] = useState(null);

//   const allSkills = [
//     { id: "1", label: "Data Mining", value: "Data Mining" },
//     { id: "2", label: "HTML5 Developer", value: "HTML5 Developer" },
//     { id: "3", label: "Writing", value: "Writing" },
//     { id: "4", label: "Adobe Photoshop", value: "Adobe Photoshop" },
//     { id: "5", label: "Web Design", value: "Web Design" },
//     { id: "6", label: "English", value: "English" },
//   ];

//   const updatedAllSkills = [...allSkills, ...(userTypedSkills || [])];

//   useEffect(() => {
//     // Assuming validation is true when at least 1 skill is selected.
//     setIsValid(skills.length > 0);
//     // Updates the parent component with the current skills.
//     updateJobData({ skill: skills });
//   }, [skills, userTypedSkills]);

//   const removeSkill = (skillToRemove) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

//   const addSkill = (skillToAdd) => {
//     if (!skills.includes(skillToAdd)) {
//       setSkills((prevSkills) => [...prevSkills, skillToAdd]);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {/* <div className="recommendation font-semibold text-black flex items-center ">
//         <FaStar className="inline mr-2" /> For the best result, add 3-5 skills
//       </div> */}
//       {/* <p className="font-semibold">Selected Skills</p>
//       {skills.length > 0 && (
//         <div className="selectedskills flex flex-col gap-3">
//           <div className="selectedSkills w-2/3 flex gap-2 flex-wrap p-2">
//             {skills.map((skill, index) => (
//               <button
//                 key={index}
//                 onClick={() => removeSkill(skill)}
//                 className="px-4 py-1 text-white bg-green-600 rounded-2xl font-semibold"
//               >
//                 {skill}
//                 <FaTimes className="inline ml-2" />
//               </button>
//             ))}
//           </div>
//         </div>
//       )} */}
//       {/* <div className="chooseSkills mt-6">
//         <p className="font-semibold">Popular skills for Your Work</p>
//         <CreateSelectOption setUserTypedSkills={setUserTypedSkills} />

//         <div className="text-base font-semibold m-2">
//           <h1>Select the skills from the below skills!!</h1>
//         </div>

//         <div className="skillsavailable w-2/3 flex gap-2 flex-wrap p-2">
//           {updatedAllSkills
//             .filter((item) => !skills.includes(item))
//             .map((skill) => (
//               <button
//                 key={skill.id}
//                 onClick={() => addSkill(skill.label)}
//                 className="px-4 pb-1 text-green-600 border-2 border-green-600 border-solid rounded-2xl font-semibold"
//               >
//                 {skill.label}
//                 <FaPlus className="inline ml-2" />
//               </button>
//             ))}
//         </div>
//       </div> */}

//       <div className="space-y-4">
//         <label className="block">
//           <span className="text-zinc-700 text-base font-semibold dark:text-zinc-300">
//             University:
//           </span>
//           <select className="form-select mt-1 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-90 dark:border-gray-600 dark:text-white outline-none p-2">
//             <option>Select University</option>
//             <option>Select University</option>
//             <option>Select University</option>
//             <option>Select University</option>
//             <option>Select University</option>
//             <option>Select University</option>
//             <option>Select University</option>
//             {/* Add more <option> tags here for other universities */}
//           </select>
//         </label>
//         <label className="block">
//           <span className="text-zinc-700 text-base font-semibold dark:text-zinc-300">
//             Class:
//           </span>
//           <select className="form-select mt-1 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-90 dark:border-gray-600 dark:bg-zinc-700 dark:text-white outline-none p-2">
//             <option>Select Class</option>
//             {/* Add more <option> tags here for other classes */}
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Skill;

import { useEffect, useState } from "react";

const Skill = ({ setIsValid, updateJobData }) => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    setIsValid(true);
    updateJobData({ university: selectedUniversity, class: selectedClass });
  }, [selectedUniversity, selectedClass]);

  console.log("selectedUniversity is", selectedUniversity);
  console.log("selectedClass is", selectedClass);

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-4">
        <label className="block">
          <span className="text-zinc-700 text-base font-semibold dark:text-zinc-300">
            University:
          </span>
          <select
            className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black"
            value={selectedUniversity}
            onChange={handleUniversityChange}
          >
            <option value="" className="bg-white" selected disabled>
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
        <label className="block">
          <span className="text-zinc-700 text-base font-semibold dark:text-zinc-300">
            Class:
          </span>
          <select
            className="w-full rounded-md border-2 outline-none p-2 focus:border-green-500 hover:border-green-500 bg-green-50 text-black appearance-none"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="" className="bg-white" selected disabled>
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
    </div>
  );
};

export default Skill;
