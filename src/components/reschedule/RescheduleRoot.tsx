import { useState } from "react"
import Reschedule from "./Reschedule"
import { DateEDP, ScheduleItem } from "@/utils/Types"

interface RescheduleRootProps {
  item: ScheduleItem
  dates: DateEDP[]
}

export const RescheduleRoot = ({item, dates}: RescheduleRootProps) => {

  const [modal, setModal] = useState(false)


  return (
    <div className='w-full flex'>
      <div onClick={() => setModal(true)} className={`${!modal && "cursor-pointer"} w-full flex items-start p-4 gap-3 bg-secondary/30 hover:scale-[101%]`}>
        <h3>Data: {item.dateDate}</h3>
        <h3>Hora: {item.schedule}</h3>
        <h3><span className='border-l border-white mr-3'></span>Medidor: {item.meterNumber}</h3>
      </div>
      {modal && <Reschedule item={item} dates={dates} close={() => setModal(false)} /> }
    </div>
  )
}