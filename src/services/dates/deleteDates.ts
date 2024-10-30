import api from "@/lib/api"


export const DELETE_DATES = async (dates: string[], token: string) => {
  try {
    const res = await api.delete("/dates", { headers: { Authorization: `Bearer ${token}` }, data: { dates: dates } })
    console.log(res)

    if (res.status === 200) {
      return "Deleted"
    } else if (res.status === 401) {
      return "Erro de autenticação"
    } else {
      return "Erro ao remover datas"
    }

  } catch (err) {
    console.log(err)
    return "Erro ao remover datas"
  }
}