import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const skills = [
  "Vuejs",
  "React",
  "PHP",
  "Angularjs",
  "Node.js",
  "jQuery",
  "API Integration",
  "TypeScript",
  "Gatsby.js",
  "Redux",
  "GraphQL",
  "Vuex",
  "Laravel",
];
const Skills = () => {
  return (
    <div className=" h-52 border-2 border-gray-200 space-y-6 bg-white ">
      <div className="  text-center flex justify-between flex-wrap  mx-24 mt-4 ">
        <h6 className=" text-3xl">Skills</h6>
        <MdOutlineModeEdit className=" border-2 rounded-full bg-white text-[#108a00] border-[#108a00] text-4xl  " />
      </div>
      <div className="flex flex-start ml-20">
        <div className="flex gap-3 flex-wrap  w-full ">
          {skills.map((item) => (
            <div className="py-2 w-32 text-center bg-slate-100 rounded-full font-semibold ">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
