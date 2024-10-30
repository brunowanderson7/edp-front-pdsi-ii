import api from "@/lib/api"
import Routes from "@/utils/Routes"

import { AxiosError } from "axios"
import jwt from "jsonwebtoken"


export const USER_LOGIN = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email: email, password: password })
    console.log(res.data)


    if (res.status === 200) {
      localStorage.setItem("token", res.data.token)
      const decoded = jwt.decode(res.data.token)
      if (decoded) {
        const { name } = decoded as { name: string }
        localStorage.setItem('name', name)
      }

      window.location.href = Routes.menu
    }
    
  } catch (err) {

    console.error(err)

    if ((err as AxiosError).response?.status === 401) {
      return 'Usuário ou senha incorretos'
    } else if ((err as AxiosError).response?.status === 403) {
      window.location.href = Routes.wait
    } else if ((err as AxiosError).response?.status === 404) {
      return 'Usuário não encontrado'
    } else if ((err as AxiosError).response?.status === 422) {
      window.location.href = Routes.check(email)
    }
  }
}