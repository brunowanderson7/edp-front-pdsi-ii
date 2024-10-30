import { useState } from "react"

interface SelectUIProps {
  title: string
  idName: string
  options: string[]
}

export const SelectUI = ({ title, idName, options }: SelectUIProps) => {

  const [active, setActive] = useState("")
  const [selectedOption, setSelectedOption] = useState(options.length > 0 ? options[options.length - 1] : null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setActive(selectedValue);
  };
  
  return (
    <div className='flex flex-col items-start justify-start w-full'>
      <label htmlFor="select-ui" className="text-[16px] font-medium text-text">{title}</label>
      <select defaultValue={selectedOption || 'Selecione'} id="select-ui" onChange={handleSelectChange} className="bg-gray-50 w-full h-10 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500">
        {options.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      <input type="text" id={idName} name={idName} className="pointer-events-none invisible absolute" defaultValue={active} />
    </div>
  )
}

export default SelectUI
