import api from "@/lib/api"

import { AxiosError } from "axios"


export const SCHEDULE = async (date: string, hour: string, obs: string, id: string, token: string) => {
  try {
    const res = await api.post("/schedules", {
      meterId: id,
      dateDate: date,
      schedule: hour,
      observationsSchedule: obs,
    }, { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data);
    if (res.status === 201) {
      return "Created"
    } else {
      return 'Erro ao adicionar medidor'
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