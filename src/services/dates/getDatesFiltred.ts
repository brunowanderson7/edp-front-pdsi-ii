import api from "@/lib/api"


export const GET_DATES_FILTRED = async (token: string) => {
  try {
    const res = await api.get("/dates?not-schedule-only=true", { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data);

    if (res.status === 200) {
      return res.data.data
    }

  } catch (err) {}
}