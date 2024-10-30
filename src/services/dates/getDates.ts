import api from "@/lib/api"


export const GET_DATES = async (token: string) => {
  try {
    const res = await api.get("/dates", { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data)

    if (res.status === 200) {
      return res.data
    }

  } catch (err) {
    
  }
}