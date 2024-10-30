import api from "@/lib/api"

import { AxiosError } from "axios"


export const GET_METERS_TO_TESTS = async (token: string, quantity: number) => {
  try {

    console.log('token: ', token)
    console.log('rota: ', `/schedules/get-meters-to-test/${quantity}`)

    const res = await api.put(`/schedules/get-meters-to-test/${quantity}`, {}, { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })

    console.log(res.data)
    if (res.status === 200) {
      return res.data
    } else {
      throw 'Erro ao buscar medidores'
    }
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      throw 'Erro de autenticação'
    }

    throw 'Erro ao buscar medidores'
  }
}