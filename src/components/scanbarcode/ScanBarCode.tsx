import { useState } from "react"
import { BsUpcScan } from "react-icons/bs"
import startGenerateReports from "../storage/start/startGenerateReports"

interface ScanBarCodeProps {
  title: string
  idName: string
}

export const ScanBarCode = ({title, idName}: ScanBarCodeProps) => {
  const [value, setValue] = useState('')


  const handleScan = async () => {

    try {
      // await startGenerateReports(['111', '222', '333', '444'])
      setValue('0203-9876-22223')
    } catch (error) {
      console.log(error)
    }
    

  }


  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={idName} className="text-base font-medium">{title}</label>
      <div className="w-full flex gap-2">
        <input
          id={idName}
          name={idName}
          defaultValue={value}
          type="text"
          className="h-10 w-full bg-white text-black px-2"
          readOnly
        />
        <button type="button" onClick={handleScan} className="h-10 px-1 bg-primary text-white text-3xl flex items-center justify-center hover:bg-secondary">
          <BsUpcScan />
        </button>
      </div>
    </div>
  )
}
export default ScanBarCode