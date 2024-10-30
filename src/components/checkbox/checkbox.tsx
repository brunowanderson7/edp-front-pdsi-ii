'use client'

import React, { useState } from 'react';

interface CheckboxProps {
  id: string,
}

const Checkbox = ({id}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-flex items-center me-5 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        name={id}
        value={isChecked ? 'true' : 'false'}
        className="sr-only peer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
    </label>
  );
};

export default Checkbox;