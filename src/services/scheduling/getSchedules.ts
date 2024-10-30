import api from "@/lib/api"


export const GET_SCHEDULES = async (token: string) => {
  try {
    const res = await api.get("/schedules", { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data)

    if (res.status === 200) {
      return res.data
    }

  } catch (err) {}
}