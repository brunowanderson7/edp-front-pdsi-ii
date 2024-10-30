import api from "@/lib/api";
import { Model } from "@/utils/Types";

import { AxiosError } from "axios";


export const ADD_MODEL = async (data: Model, token: string) => {
  try {
    const res = await api.post("/models", {
      name: data.name,
      type: data.type,
      manufacturer: data.manufacturer,
      voltage: data.voltage,
      current: data.current,
      wires: data.wires,
      class: data.class,
      constant: data.constant,
    }, { headers: { Authorization: `Bearer ${token}` } })

    console.log(res.data)
    if (res.data.message === 'Created') {
      return 'Created'
    } else {
      return 'Erro ao adicionar modelo'
    }
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      return 'Erro de autenticação'
    } else if ((err as AxiosError).response?.status === 409) {
      return 'Modelo já cadastrado'
    }
  }
}