import api from "@/lib/api"

import { AxiosError } from "axios"


export const PASSWORD_RECOVERY_CHECK = async (id: string, token: string, pass: string) => {
  try {
    const res = await api.patch(`/password/${id}/reset-password/${token}`, { password: pass })
    console.log(res.data)

    if (res.status === 200) {
      return res.status
    }

  } catch (err) {
    if ((err as AxiosError).response?.status === 404) {
      // window.location.href = Routes.notFound
      return 'Usuário não encontrado'
    }
  }
}