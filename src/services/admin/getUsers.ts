import api from "@/lib/api"
import Routes from "@/utils/Routes"

import { AxiosError } from "axios"


export const GET_UNAPPROVED_USER = async (token: string) => {
  try {
    const res = await api.get("/unapproved-users", { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data)

    if (res.status === 200) {
      return res.data.data
    }

  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      window.location.href = Routes.login
    }
  }
}