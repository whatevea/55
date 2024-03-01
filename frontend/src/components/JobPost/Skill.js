import { useEffect, useState } from "react";
import { FaSearch, FaStar, FaPlus, FaTimes } from "react-icons/fa";

const Skill = ({ setIsValid, updateJobData }) => {
    const [skills, setSkills] = useState([]);
    const allSkills = ["Data Mining", "HTML5 Developer", "Writing", "Adobe Photoshop", "Web Design", "English"];

    useEffect(() => {
        // Assuming validation is true when at least 1 skill is selected.
        setIsValid(skills.length > 0);
        // Updates the parent component with the current skills.
        updateJobData({ skill: skills });
    }, [skills]);

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const addSkill = (skillToAdd) => {
        if (!skills.includes(skillToAdd)) {
            setSkills(prevSkills => [...prevSkills, skillToAdd]);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold">Search Skills or add your own</p>
            <div className="w-2/3 rounded-md border p-2 flex gap-2 items-center">
                <FaSearch />
                <input type="text" className="h-full outline-none w-full" />
            </div>
            <div className="recommendation font-semibold text-gray-500">
                <FaStar className="inline" /> For the best result, add 3-5 skills
            </div>
            {skills.length > 0 && (
                <div className="selectedskills flex flex-col gap-3">
                    <p className="font-semibold">Selected Skills</p>
                    <div className="selectedSkills w-2/3 flex gap-2 flex-wrap p-2">
                        {skills.map((skill, index) => (
                            <button key={index} onClick={() => removeSkill(skill)} className="px-4 py-1 text-white bg-green-600 rounded-2xl font-semibold">
                                {skill}<FaTimes className="inline ml-2" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="chooseSkills mt-6">
                <p className="font-semibold">Popular skills for Your Work</p>
                <div className="skillsavailable w-2/3 flex gap-2 flex-wrap p-2">
                    {allSkills.filter(item => !skills.includes(item)).map((skill, index) => (
                        <button key={index} onClick={() => addSkill(skill)} className="px-4 pb-1 text-green-600 border-2 border-gray-500 rounded-2xl font-semibold">
                            {skill}<FaPlus className="inline ml-2" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skill;
