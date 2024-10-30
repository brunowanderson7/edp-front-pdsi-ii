import api from "@/lib/api"

import { AxiosError } from "axios"


export const RESCHEDULE = async (id: number, date: string, hour: string, reason: string, token: string) => {
  try {
    console.log("jjjj", id, token);
    const res = await api.post("/reschedules", {
      id: id,
      dateDate: date,
      schedule: hour,
      reason: reason
    }, { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data);
    if (res.status === 201) {
      return "Created"
    } else {
      return 'Erro ao reagendar horário'
    }
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      return 'Erro de autenticação'
    } else if ((err as AxiosError).response?.status === 409) {
      return 'Horario já cadastrado'
    }
  }
}