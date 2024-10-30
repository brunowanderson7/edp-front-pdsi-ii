import api from "@/lib/api"

import { AxiosError } from "axios"
import { GET_METERS } from "./meter"
import { m } from "framer-motion"


export type FullMeter = {
  id: string,
  number: string,
  instalation: string,
  toi: string,
  note: string,
  csd: string,
  customerName: string,
  customerPresent: boolean,
  scheduledObservations: string | null,
  modelId: string | null,
  storageLocation: string,
  deliveredBy: string,
  entryObservations: string,
  status: string
}


export const GET_METERS_FOR_ID = async (token: string, id: string) => {
  try {
    const meters = await GET_METERS(token)

    const meterdata: FullMeter[] = meters.data

    console.log("METERS: ",meterdata)

    console.log("ID: ",id)
    const meter = meterdata.find((meter) => meter.id === id)

    console.log(meter)
    return meter
    
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      // window.location.href = Routes.notFound
      console.log(err)
      throw 'Erro de autenticação 11'
    }
    console.log(err)
    throw 'Erro ao buscar medidor 22'
  }
}