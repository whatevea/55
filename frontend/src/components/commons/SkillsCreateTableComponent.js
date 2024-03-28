import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const SkillsCreateTableComponent = ({ updateSkills, userSkills, errors }) => {
  console.log("errors we are inside SkillsCreateTableComponent is", errors);

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const [skillsComponentHasValue, setSkillsComponentHasValue] = useState(false);

  useEffect(() => {
    if (userSkills && userSkills.length > 0) {
      setValue(userSkills);
    }
  }, [userSkills]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        updateSkills([...value, createOption(inputValue)]);

        setInputValue("");
        event.preventDefault();
        break;
      default:
        return;
    }
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleRemoveOption = (index) => {
    // setValue((prev) => prev.filter((_, i) => i !== index));
    setValue((prev) => {
      const updatedValue = prev.filter((_, i) => i !== index);
      updateSkills(updatedValue); // Update skills with the updated value
      return updatedValue;
    });
  };

  if (errors.skills) {
    console.log("border-red-500");
  } else {
    console.log(
      "border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900 placeholder:text-gray-400 w-full focus-within:border-green-600 sm:text-sm sm:leading-6 block rounded-md"
    );
  }

  return (
    <>
      <div
        className={`${
          errors?.skills
            ? "border-2 border-red-500 rounded-md px-2 py-1.5"
            : "border-2 border-solid border-gray-300 px-2 py-1.5 text-gray-900 placeholder:text-gray-400 w-full focus-within:border-green-600 sm:text-sm sm:leading-6 block rounded-md"
        } `}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your skills and press enter..."
          className="w-full outline-none mb-1 focus:outline-none placeholder:text-base"
        />
        <div className="flex flex-wrap gap-2">
          {value.map((option, index) => (
            <span
              key={index}
              className="ml-2 p-1.5 rounded-lg flex items-center text-sm font-semibold bg-green-100"
            >
              {option.label}{" "}
              <FaTimes
                className="inline ml-2"
                onClick={() => handleRemoveOption(index)}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsCreateTableComponent;
