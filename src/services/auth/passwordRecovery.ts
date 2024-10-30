import api from "@/lib/api"
import Routes from "@/utils/Routes"

import { AxiosError } from "axios"


export const PASSWORD_RECOVERY = async (email: string) => {
  try {
    const res = await api.post("/password-recovery", { email: email })
    console.log(res.data)

    if (res.status === 200) {
      window.location.href = Routes.resetCheck(email)
    }

  } catch (err) {
    if ((err as AxiosError).response?.status === 404) {
      return 'Usuário não encontrado'
    }
  }
}