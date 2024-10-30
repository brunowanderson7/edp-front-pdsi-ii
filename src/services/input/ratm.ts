import api from "@/lib/api";

import { AxiosError } from "axios";

export type InputRATM = {
  // id: string,
  analyzeOrder: string,
  clientAccompanied: boolean,
  rehearsalVisual: string,
  dielectric: string,
  sealInvolucro: string,
  statusInvolucro: string,
  seal1: string,
  statusLacre1: string,
  seal2: string,
  statusLacre2: string,
  readingMeter: string,
  tableTest: string,
  cn: string,
  ci: string,
  cp: string,
  cnri: string,
  cnrc: string,
  march: string,
  register: string,
  phaseInterrupted: string,
  codeIrregularity: string,
  descriptionIrregularity: string,
  observationsIrregularity: string,
  meterBroken: boolean,
  displayOff: boolean,
  easeAccess: boolean,
  coilDamaged: boolean,
  apparentlyOrder: boolean,
  failedDielectric: boolean,
  strangeBody: boolean,
  burntBorne: boolean,
  photoUrls: string[],
  meterId: string,
}

interface RATM {
  token: string,
  data: InputRATM
}


export const ADD_RATM = async ({token, data}: RATM) => {
  try {
    const res = await api.post("/ratm", [data], { headers: { Authorization: `Bearer ${token}` } })

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