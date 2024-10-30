'use client'

import Calendar from "react-calendar"
import ButtonUI from "../button/ButtonUI"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaCircle } from "react-icons/fa"
import { DateEDP } from "@/utils/Types"

import './styles.css'
import SelectUI from "../select/SelectUI"
import Routes from "@/utils/Routes"
import { SCHEDULE } from "@/services/scheduling/schedule"


interface ScheduleCalendarUIProps {
  id: string
  observation: string
  selectedDates: DateEDP[]
}


export const CalendarScheduleUI = ({id, observation, selectedDates}: ScheduleCalendarUIProps) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [activeStart, setActiveStart] = useState<Date>();
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
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 29);
  
    while (!datasSelecionadas.has(currentDate.toDateString())) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    setScheduleDate(currentDate.toDateString());
    setActiveStart(currentDate);
  }, [datasSelecionadas]);


  useEffect(() => {
    // Encontrar o objeto correspondente à scheduleDate
    const selectedDateObject = selectedDates.find((dateObj) => dateObj.date === scheduleDate);
  
    // Se encontrarmos uma correspondência, atualizamos o estado
    if (selectedDateObject) {
      setSchedulesList(selectedDateObject.schedules);
    }
  }, [scheduleDate]);

  
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    setLoadingActive(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const scheduleHour = formData.get("scheduleHour")?.toString() ?? ""

    if (scheduleHour === '') {
      alert('Selecione um horário')
      setLoadingActive(false)
      return
    } else if (scheduleDate && scheduleHour && id) {
      try {
        console.log(scheduleDate, scheduleHour, token, observation, id)
        const data = await SCHEDULE(scheduleDate, scheduleHour, observation, id, token)
        if (data === "Created") {
          alert("Data agendada com sucesso!");
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

            return isSelected ? (
              <div className={`p-[2px] md:p-1 ml-1 rounded-md text-white bg-green-500`}>
                <FaCircle />
              </div>
            ) : null;
          }}
          tileDisabled={({ date, view }) => {
            const dateString = date.toDateString();
            return view === 'month' && !datasSelecionadas.has(dateString);
          }}
          onClickDay={(date, event) => {
            const dateString = date.toDateString();
            setScheduleDate(dateString);
          }}
          defaultValue={activeStart}
          defaultActiveStartDate={activeStart}
          
          className="my-4"
        />
        )}
        <form id="form-submit-date" onSubmit={handleSubmit} className="w-full max-w-[720px] mb-4" >
          <SelectUI title='Horário' idName='scheduleHour' options={schedulesList} /> 
        </form>
        <div className="w-full grid grid-cols-2 gap-4 max-w-[720px]">
          <ButtonUI title="Cancelar" typeButton='outline' onClick={() => router.push(Routes.menu)} />
          <ButtonUI form="form-submit-date" title="Comfirmar" typeButton='default' />
        </div>
    </div>
  );
};