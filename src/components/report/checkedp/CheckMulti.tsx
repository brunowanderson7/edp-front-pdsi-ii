import { useState } from "react"
import CheckItem from "./CheckItem"
import { on } from "events"

export type StateData = {
  id: number
  title: string
  value: boolean
}

interface CheckMultiProps {
  data: StateData[]
  index?: number

  type?: 'row'
  onChange?: (index: number, newValue: number) => void
}

const CheckMulti = ({data, index, type, onChange}: CheckMultiProps) => {
  const [options, setOptions] = useState<StateData[]>(data)

  const handleOptionChange = (id: number) => {
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, value: true };
      } else {
        return { ...option, value: false };
      }
    });
    setOptions(updatedOptions);
    (onChange && index !== undefined ) && onChange(index, id)
  }

  return (
    <div className={`${type === 'row' && 'w-full flex flex-row gap-3 items-start -mt-3'}`}>
      {options.map((option) => (
        <CheckItem
          key={option.id}
          title={option.title}
          checked={option.value}
          onChange={() => handleOptionChange(option.id)}
        />
      ))}

      {/* <button className="bg-fuchsia-600 p-4" onClick={() => console.log(options)}>aperte</button> */}
    </div>
  )
}

export default CheckMulti
