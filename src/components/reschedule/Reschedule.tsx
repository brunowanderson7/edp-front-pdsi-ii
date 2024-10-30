import { DateEDP, ScheduleItem } from "@/utils/Types";
import { FaXmark } from "react-icons/fa6";
import { CalendarRescheduleUI } from "./CalendarReschedule";
import { useEffect, useState } from "react";


interface RescheduleProps {
  item: ScheduleItem
  dates: DateEDP[]

  close: () => void
}

export const Reschedule = ({item, dates, close}: RescheduleProps) => {

  const [reasons, setReasons] = useState<string[]>([])

  useEffect(() => {
    const reasonsList = [
      { label: "A pedido do cliente", key: "CR" },
      { label: "Sem assinatura", key: "WS" },
      { label: "Medidor Atrasado", key: "DM" }
    ];
  
    const filteredReasons = reasonsList
      .filter(reasonItem => item.rescheduleReason[reasonItem.key as keyof typeof item.rescheduleReason] > 0)
      .map(reasonItem => reasonItem.label);
  
    console.log(filteredReasons);
    setReasons(filteredReasons);
  }, [item]);



  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-background flex flex-col text-white p-4">
      <button onClick={() => close()} className="absolute left-2 top-2 text-2xl hover:scale-105"><FaXmark /></button>
      <CalendarRescheduleUI reason={reasons} id={item.id} scheduleDateActive={item.dateDate} hour={item.schedule} selectedDates={dates} />
    </div>
  )
}

export default Reschedule