import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const CustomSelect = ({setUserTypedSkills}) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([]);

  setUserTypedSkills(value)

  console.log('value is', value);

  const createOption = (label) => ({
    id: nanoid(),
    label,
    value: label,
  });

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleRemove = (removedValue) => {
    setValue((prev) => prev.filter((option) => option.value !== removedValue));
  };

  return (
    <div className="w-[80%] border-2 border-green-500 rounded-md relative p-3 mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-2 text-base border-none outline-none w-full mb-4"
        placeholder="Type skills you want for this project and press enter..."
      />
      <div className='flex flex-wrap gap-2'>
        {value.map((option) => (
          <div key={option.id} className="w-[fit-content] flex items-center justify-between gap-4 text-sm font-semibold border border-green-600 relative rounded-full bg-gray-100">
            <div className='flex items-center justify-center relative gap-2 p-1'>

              <div className='text-green-600 text-sm ml-2'>
                {option.label}
              </div>
              <i className="fas fa-times cursor-pointer mr-2 relative top-[2px] text-green-600 block text-sm font-bold" onClick={() => handleRemove(option.value)}></i>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
