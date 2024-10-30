'use client'

import { useState, useRef, useEffect } from "react";

interface SelectEditProps {
  value: string;
  id: string;
  title: string;
  options: string[];
}

export const SelectEdit = ({ value, id, title, options }: SelectEditProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col items-start justify-start gap-y-1 mb-2" >
      <label className="text-white">{title}</label>
      <div className="w-full flex items-center justify-between border-2 border-white p-2">
        {isEditing ? (
          <select
            name={id}
            id={id}
            className="bg-zinc-50 p-2 text-black w-full"
            ref={selectRef}
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <span className="w-full p-2 bg-slate-300 text-black">{currentValue}</span>
        )}
        {!isEditing && (
          <button className="bg-orange-400 w-28 p-2 flex items-center justify-center ml-4" onClick={handleEditClick}>Editar</button>
        )}
      </div>
    </div>
  );
};
