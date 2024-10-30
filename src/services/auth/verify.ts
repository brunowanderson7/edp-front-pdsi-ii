import api from "@/lib/api"

import { AxiosError } from "axios"


export const USER_VERIFY = async (id: string, token: string) => {
  try {
    const res = await api.get(`/email/${id}/verify-email/${token}`)
    console.log(res.data)

    if (res.status === 200) {
      return res.status
    }

  } catch (err) {
    if ((err as AxiosError).response?.status === 404) {
      // window.location.href = Routes.notFound
      console.log('error')
    }
  }
}