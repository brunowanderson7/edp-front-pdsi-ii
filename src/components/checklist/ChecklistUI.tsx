'use client'

import { useEffect, useState } from "react"

import { CheckboxItem } from "../itens/itens"


interface ChecklistUIProps {
  title: string
  itens: string[]
}

export const ChecklistUI = ({ title, itens }: ChecklistUIProps) => {
  const [checked, setChecked] = useState<boolean[]>([])
  
  useEffect(() => {
      if (itens &&itens.length > 0) {
        setChecked(Array.from({ length:itens.length }, () => false));
      }
    }, [itens]);
  
  
    const handleCheck = (index: number) => {
    const updatedChecklist = checked.map((item, i) => (i === index ? !item : false));
    setChecked(updatedChecklist);
  }


  return (
    <div className='flex flex-col items-start justify-start'>
      <h1 className="text-[16px] font-medium text-text">{title}</h1>
      {itens.map((item, index) => (
        <div key={index} className='flex items-center justify-center gap-3'>
          <CheckboxItem checked={checked[index]} idName={`item-${index}-${item.toLowerCase()}`} onChange={() => (handleCheck(index))} /><h3>{item}</h3>
        </div>
      ))}
    </div>
  )
}
export default ChecklistUI