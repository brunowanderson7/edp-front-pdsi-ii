import api from "@/lib/api"


export const REJECT_USER = async (id: string, token: string) => {
  try {

    const res = await api.post(`/approve-user`, { id: id, isUserApproved: false }, { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data)

    if (res.status === 200) {
      return res.status
    }

  } catch (err) {}
}