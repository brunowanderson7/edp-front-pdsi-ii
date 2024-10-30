import api from "@/lib/api"
import Routes from "@/utils/Routes"

import { AxiosError } from "axios"


export const USER_SIGNUP = async (name: string, email: string, password: string) => {
  try {
    console.log(name, email, password)
    const res = await api.post("/register", { name: name, email: email, password: password })
    console.log(res.data)

    if (res.status === 201 || res.status === 422) {
      window.location.href = Routes.check(email)
    }

  } catch (err) {
    if ((err as AxiosError).response?.status === 409) {
      return 'Usuário já cadastrado'
    } else if ((err as AxiosError).response?.status === 422) {
      window.location.href = Routes.check(email)
    }
  }
}