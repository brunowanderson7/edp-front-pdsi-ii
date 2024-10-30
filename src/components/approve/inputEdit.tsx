'use client';

import { useState, useRef, useEffect } from "react";

interface InputEditProps {
  value: string;
  id: string;
  title: string;
}

export const InputEdit = ({ value, id, title }: InputEditProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="flex flex-col items-start justify-start gap-y-1 mb-2">
      <label className="text-white">{title}</label>
      <div className="w-full flex items-center justify-between border-2 border-white p-2">
        {isEditing ? (
          <div className="w-full flex justify-between">
            <input
              name={id}
              id={id}
              className="bg-zinc-50 p-2 text-black w-full"
              ref={inputRef}
              type="text"
              value={currentValue}
              onChange={handleChange}
            />
            <button
              className="bg-green-400 w-28 p-2 flex items-center justify-center ml-4"
              onClick={handleSaveClick}
            >
              Salvar
            </button>
          </div>
        ) : (
          <span className="w-full p-2 bg-slate-300 text-black">{currentValue}</span>
        )}
        {!isEditing && (
          <button
            className="bg-orange-400 w-28 p-2 flex items-center justify-center ml-4"
            onClick={handleEditClick}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
};
