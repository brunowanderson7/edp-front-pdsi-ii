import api from "@/lib/api"
import { Meter } from "@/utils/Types"

import { AxiosError } from "axios"


export const RECEIVE_MODEL = async (data: Meter, token: string) => {
  try {
    const res = await api.post("/meters", {
      number: data.number,
      instalation: data.instalation,
      toi: data.toi,
      note: data.note,
      csd: data.csd,
      customerName: data.customerName,
      customerPresent: data.customerPresent
    }, { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data)
    if (res.status === 201) {
      return res.data
    } else {
      return 'Erro ao adicionar medidor'
    }
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      return 'Erro de autenticação'
    } else if ((err as AxiosError).response?.status === 409) {
      return 'Medidor já cadastrado'
    }
  }
}