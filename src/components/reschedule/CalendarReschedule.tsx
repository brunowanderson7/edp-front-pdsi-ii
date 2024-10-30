'use client'

import Calendar from "react-calendar"
import ButtonUI from "../button/ButtonUI"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaCircle } from "react-icons/fa"
import { DateEDP } from "@/utils/Types"
import { FaXmark } from "react-icons/fa6"

import '../schedule/styles.css'
import SelectUI from "../select/SelectUI"
import Routes from "@/utils/Routes"
import { RESCHEDULE } from "@/services/scheduling/reschedule"


interface ScheduleCalendarUIProps {
  id: number
  scheduleDateActive: string
  hour: string
  reason: string[]
  selectedDates: DateEDP[]
}


export const CalendarRescheduleUI = ({id, scheduleDateActive, reason, hour, selectedDates}: ScheduleCalendarUIProps) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [activeStart, setActiveStart] = useState<Date>(new Date(scheduleDateActive));
  const currentDate = new Date();

  // Filtrar as datas que são menos que 30 dias
  const initialSelectedDates = selectedDates
    .filter((dateType) => {
      const date = new Date(dateType.date);
      const daysDifference = Math.floor((date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
      return daysDifference >= 30; // Agora filtramos para incluir apenas as datas com mais de 30 dias
    })
    .map((dateType) => dateType.date);

  const [datasSelecionadas, setDatasSelecionadas] = useState<Set<string>>(new Set(initialSelectedDates));

  const [schedulesList, setSchedulesList] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('')


  const [token, setToken] = useState('')
  
  const router = useRouter()


  let tokenStorage = ''

  useEffect(() => {
    if (tokenStorage !== '') {
      return
    }
    tokenStorage = localStorage.getItem('token') || ''
    setToken(tokenStorage)

    if (!tokenStorage) {
      router.push(Routes.login)
    }
  }, []);


  useEffect(() => {
    // Encontrar o objeto correspondente à scheduleDate
    const selectedDateObject = selectedDates.find((dateObj) => dateObj.date === scheduleDate);
  
    // Se encontrarmos uma correspondência, atualizamos o estado
    if (selectedDateObject) {
      setSchedulesList(selectedDateObject.schedules);
    }
  }, [scheduleDate]);

  
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    // setLoadingActive(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const rescheduleHour = formData.get("reschedule-hour")?.toString() ?? ""
    const reason = formData.get("reason")?.toString() ?? ""


    if (rescheduleHour === '') {
      alert('Selecione um horário')
      setLoadingActive(false)
      return
    } else if (reason === '' || reason === 'Selecione uma razão') {
      alert('Selecione uma razão')
      setLoadingActive(false)
      return
    } else if (scheduleDate && rescheduleHour && id) {
      try {

        const reasonData = reason === "A pedido do cliente" ? "CR" : reason === "Sem assinatura" ? "WS" : "DM"

        console.log(scheduleDate, rescheduleHour, token, reason, id)
        const data = await RESCHEDULE(id, scheduleDate, rescheduleHour, reasonData, token)
        if (data === "Created") {
          alert("Data reagendada com sucesso!");
          router.push(Routes.menu);
        } else {
          alert(data)
          setLoadingActive(false);
        }
      } catch (err) {
        console.error("Erro na requisição");
        setLoadingActive(false);
      }
    }



    // if (rescheduleHour === '') {
    //   alert('Selecione um horário')
    //   setLoadingActive(false)
    //   return
    // } else if (scheduleDate && rescheduleHour && id) {
    //   try {
    //     console.log(scheduleDate, rescheduleHour, token, observation, id)
    //     const data = await Services.schedule(scheduleDate, scheduleHour, observation, id, token)
    //     if (data === "Created") {
    //       alert("Data agendada com sucesso!");
    //       router.push(Routes.menu);
    //     } else {
    //       alert(data)
    //       setLoadingActive(false);
    //     }
    //   } catch (err) {
    //     console.error("Erro na requisição");
    //     setLoadingActive(false);
    //   }
    // }
  }
  


  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {activeStart && (
        <Calendar
          selectRange={false}
          locale="pt-BR"
          tileContent={({ date }) => {
            const dateString = date.toDateString();
            const isSelected = datasSelecionadas.has(dateString);
            const isActiveStart = dateString === scheduleDateActive;
          
            return (
              <div className={`p-[2px] md:p-1 ml-1 rounded-md text-white ${isActiveStart ? 'bg-red-500' : (isSelected ? 'bg-green-500' : 'hidden')}`}>
                {isActiveStart ? <FaXmark /> : <FaCircle />}
              </div>
            );
          }}
          tileDisabled={({ date, view }) => {
            const dateString = date.toDateString();
            return view === 'month' && (!datasSelecionadas.has(dateString));
          }}
          onClickDay={(date, event) => {
            const dateString = date.toDateString();
            setScheduleDate(dateString);
          }}
          defaultActiveStartDate={activeStart}
          defaultValue={activeStart}
          className="my-4"
        />
        )}
        <form id="form-submit-reschedule" onSubmit={handleSubmit} className="w-full max-w-[720px] mb-4" >
          <SelectUI title='Horário' idName='reschedule-hour' options={schedulesList} />
          <SelectUI title='Rasão de agendamento' idName='reason' options={reason} />
        </form>
        <div className="w-full grid grid-cols-2 gap-4 max-w-[720px]">
          <ButtonUI onClick={() => router.push(Routes.menu)} title="Cancelar" typeButton='outline' />
          <ButtonUI form="form-submit-reschedule" title="Comfirmar" typeButton='default' />
        </div>
    </div>
  );
};