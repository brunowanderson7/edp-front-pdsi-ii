import api from "@/lib/api"


export const UPDATE_PERMISSIONS = async (id: string, token: string, permissions: {}) => {
  try {

    console.log("Atualizando permissões:", id, permissions)
    const res = await api.put(`/update-permissions`, { id: id, permissions: permissions }, { headers: { Authorization: `Bearer ${token}` } })
    console.log(res.data)

    if (res.status === 200) {
      return res.status
    }

  } catch (err) {}
}