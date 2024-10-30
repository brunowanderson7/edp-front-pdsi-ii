import api from "@/lib/api"

import { AxiosError } from "axios"


export const GET_MODELS = async (token: string) => {
  try {
    const res = await api.get("/models", { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data)
    if (res.status === 200) {
      return res.data
    } else {
      throw 'Erro ao buscar modelos'
    }
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      throw 'Erro de autenticação'
    }

    throw 'Erro ao buscar modelos'
  }
}