import { useState } from "react"

interface CheckItemProps {
  title: string
  checked: boolean
  onChange: () => void
}

const CheckItem = ({ title, checked, onChange }: CheckItemProps) => {
  const updateCheck = () => {
    onChange()
  };

  return (
    <div className="w-full flex items-center justify-start gap-2">
      <div onClick={updateCheck} className="w-4 h-4 flex items-center justify-center bg-white cursor-pointer">
        {checked && <div className="w-3 h-3 bg-fuchsia-700"></div>}
      </div>
      <p >{title}</p>
    </div>
  );
};

export default CheckItem
