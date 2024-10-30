import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FaCheck, FaFile } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './styles.css';
import Routes from '@/utils/Routes';
import Loading from '../loading/loading';
import ButtonUI from '../button/ButtonUI';
import { DELETE_DATES } from '@/services/dates/deleteDates';
import { ADD_DATES } from '@/services/dates/addDates';


export interface DateType {
  date: string
  isScheduled: boolean
}

interface CalendarUIProps {
  token: string
  selectedDates: DateType[];
}


export const EditDataCalendarUI = ({token, selectedDates}: CalendarUIProps) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [datasSelecionadas, setDatasSelecionadas] = useState<Set<string>>(new Set(selectedDates.map((dateType) => dateType.date)));
  
  const router = useRouter()
  
  const disabledDatesList = selectedDates.filter((dateType) => !dateType.isScheduled).map((dateType) => dateType.date);
  const stateInitial = selectedDates.map((dateType) => dateType.date)

  const handleDataChange = (value: Date | Date[] | null, event: React.ChangeEvent<any>) => {
    if (value !== null && value !== undefined) {
      setDatasSelecionadas((prevDatas) => {
        const newDates = Array.isArray(value) ? value : [value];
        const updatedDates = new Set(prevDatas);
  
        newDates.forEach((date) => {
          const dateString = date.toDateString();
          if (updatedDates.has(dateString)) {
            updatedDates.delete(dateString);
          } else {
            updatedDates.add(dateString);
          }
        });
  
        return updatedDates;
      });
    }
  };

  const handleDeleteDates = async () => {
    setLoadingActive(true);

    const dataDelete = stateInitial.filter((date) => !datasSelecionadas.has(date));

    try {
      const data = await DELETE_DATES(dataDelete, token);

      if (data === "Deleted" ) {
        alert("Datas deletadas com sucesso!");
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


  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className='p-4 flex gap-4'>
        <div className='flex gap-3'>
          <div className="p-[2px] md:p-1 ml-1 rounded-md text-white bg-orange-500">
            <FaFile />
          </div>
          <h1>Dias Agendados</h1>
        </div>
        <div className='flex gap-3'>
          <div className="p-[2px] md:p-1 ml-1 rounded-md text-white bg-green-500">
            <FaCheck />
          </div>
          <h1>Dias Livres</h1>
        </div>
      </div>
      <Calendar
        onChange={handleDataChange as any}
        selectRange={false}
        locale="pt-BR"
        tileContent={({ date }) => {
          const dateString = date.toDateString();
          const isSelected = datasSelecionadas.has(dateString);
          const isDisabled = disabledDatesList.includes(dateString);
      
          return isSelected ? (
            <div className={`p-[2px] md:p-1 ml-1 rounded-md text-white ${!isDisabled ? 'bg-orange-500' : 'bg-green-500'}`}>
              {!isDisabled ? <FaFile /> : <FaCheck />}
            </div>
          ) : null;
        }}
        tileDisabled={({ date, view }) => {
          const dateString = date.toDateString();
          return view === 'month' && !disabledDatesList.includes(dateString) || !stateInitial.includes(dateString);
        }}
        
        className="my-4"
      />
      <div className='w-full max-w-[720px]'><ButtonUI title="Salvar" typeButton='default' onClick={handleDeleteDates} /></div>
    </div>
  );
};




export const AddDataCalendarUI = ({token, selectedDates}: CalendarUIProps) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [datasSelecionadas, setDatasSelecionadas] = useState<Set<string>>(
    new Set(selectedDates.map((dateType) => dateType.date))
  );
  const router = useRouter()

  const disabledDatesList = selectedDates.filter((dateType) => !dateType.isScheduled).map((dateType) => dateType.date);
  const stateInitial = selectedDates.map((dateType) => dateType.date)

  const handleDataChange = (value: Date | Date[] | null, e: React.ChangeEvent<any>) => {
    if (value !== null && value !== undefined) {
      setDatasSelecionadas((prevDatas) => {
        const newDates = Array.isArray(value) ? value : [value];
        const updatedDates = new Set(prevDatas);
  
        newDates.forEach((date) => {
          const dateString = date.toDateString();
          if (updatedDates.has(dateString)) {
            updatedDates.delete(dateString);
          } else {
            updatedDates.add(dateString);
          }
        });
  
        return updatedDates;
      });
    }
  };

  const handleSaveDates = async () => {
    setLoadingActive(true);

    try {
      const data = await ADD_DATES(Array.from(datasSelecionadas), token);
      if (data === "Created" ) {
        alert("Datas salvas com sucesso!");
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

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <Loading active={loadingActive} />
      <Calendar
        onChange={handleDataChange as any}
        selectRange={false}
        locale="pt-BR"
        tileContent={({ date }) => {
          const dateString = date.toDateString();
          const isSelected = datasSelecionadas.has(dateString);
          const isDisabled = disabledDatesList.includes(dateString);
      
          return isSelected ? (
            <div className={`p-[2px] md:p-1 ml-1 rounded-md text-white ${isDisabled ? 'bg-green-500' : 'bg-green-500'}`}>
              {/* {isDisabled ? <FaFile /> : <FaCheck />} */}
              <FaCheck />
            </div>
          ) : null;
        }}
        tileDisabled={({ date }) => {
          const dateString = date.toDateString();
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
      
          return disabledDatesList.includes(dateString) || date <= currentDate || stateInitial.includes(dateString);
        }}
        
        className="my-4"
      />
      <div className='w-full max-w-[720px]'><ButtonUI title="Salvar" typeButton='default' onClick={handleSaveDates} /></div>
    </div>
  );
};
