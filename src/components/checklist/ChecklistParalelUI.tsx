'use client'

import { CheckItemParalel } from "./CheckItemParalel";

import React, { useEffect, useState } from "react";

interface ChecklistUIProps {
  title?: string;
  itens: string[];
  prefix: string;
}

export const ChecklistParalelUI = ({ title, itens, prefix }: ChecklistUIProps) => {
  const [checked, setChecked] = useState<boolean[]>(Array.from({ length: itens.length }, () => false))

  useEffect(() => {
    if (itens && itens.length > 0) {
      setChecked(Array.from({ length: itens.length }, () => false));
    }
  }, [itens]);

  const handleCheck = (index: number) => {
    // Atualiza o estado checked para desmarcar todos os itens
    const updatedChecklist = checked.map((item, i) => (i === index ? !item : false));
    setChecked(updatedChecklist);
  };

  return (
    <div className={`flex ${title ? 'flex-col' : 'flex-row gap-4'} items-start justify-start`}>
      
      {title && <h1 className="text-[16px] font-medium text-text">{title}</h1>}
      {itens.map((item, index) => (
        <div key={index} className="flex items-center justify-center gap-2">
          <CheckItemParalel
            checked={checked[index]}
            idName={`${prefix}-item-${index}-${item.toLowerCase().trim().replace(/\s/g, '')}`}
            onChange={() => handleCheck(index)}
          />
          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
};