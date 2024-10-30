import api from "@/lib/api"


export const ADD_DATES = async (dates: string[], token: string) => {
  try {
    const res = await api.post("/dates", { dates: dates }, { headers: { Authorization: `Bearer ${token}` } })
    console.log(res)

    if (res.status === 201) {
      return "Created"
    } else if (res.status === 401) {
      return "Erro de autenticação"
    } else {
      return "Erro ao adicionar datas"
    }

  } catch (err) {
    console.log(err)
    return "Erro ao adicionar datas"
  }
}