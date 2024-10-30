import api from "@/lib/api"

import { AxiosError } from "axios"

export type UpdateMeter = {
  id: string,
  token: string,
  model: number,
  stored: string,
  delivered: string,
  observation?: string
}


export const RECEIVE_METER = async ({id, token, model, stored, delivered, observation }: UpdateMeter) => {
  console.log(`/meters/${id}`)
  try {
    const res = await api.patch(`/meters/${id}`, {
      modelId: model,
      storageLocation: stored,
      deliveredBy: delivered,
      entryObservations: observation,
    }, { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data);
    if (res.status === 200) {
      try {
        const res = await api.put("/schedules/update-status", {
          meterId: id,
          meterStatus: 'RECEIVED'
        }, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        if (res.status === 200) {
          return "OK"
        }
      } catch (err) {
        console.log(err)
        return 'Erro ao atualizar status'
      }
      return 'OK'
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