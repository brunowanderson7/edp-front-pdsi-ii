'use client'

import { FormEvent } from "react"
import { PermisionItem } from "../itens/itens"
import { useState } from "react"

import Loading from "../loading/loading"
import { APPROVE_USER } from "@/services/admin/approveUser"
import { UPDATE_PERMISSIONS } from "@/services/admin/updatePermissions"

const permisions = [
  {
    id: 'manager',
    name: 'Gerenciar Usuários'
  },
  {
    id: 'manageDates',
    name: 'Gerenciar Datas'
  },
  {
    id: 'schedule',
    name: 'Agendar'
  },
  {
    id: 'reschedule',
    name: 'Reagendar'
  },
  {
    id: 'ratm',
    name: 'RATM'
  },
  {
    id: 'manageMeasureModel',
    name: 'Inserir Modelo'
  },
  {
    id: 'discard',
    name: 'Descartar'
  },
  {
    id: 'consult',
    name: 'Consultar'
  },
]

interface permisionUser {
  manager?: boolean,
  manageDates?: boolean,
  schedule?: boolean,
  reschedule?: boolean,
  ratm?: boolean,
  manageMeasureModel?: boolean,
  discard?: boolean,
  consult?: boolean,

}


interface PermisionsProps {
  name: string,
  id: string,
  token: string,
  action: () => void
}

export const Permisions = ({name, id, token, action}: PermisionsProps) => {

  const [loadingActive, setLoadingActive] = useState(false);

  async function handleConfirm(event: FormEvent<HTMLFormElement>) {
    setLoadingActive(true)
    event.preventDefault()

    let permisionData: permisionUser = {}
    const formData = new FormData(event.currentTarget)
    
    const manager = formData.get("manager")?.toString() ?? "false"
    if (manager === "true") {
      permisionData.manager = true
    }
    
    const manageDates = formData.get("manageDates")?.toString() ?? "false"
    if (manageDates === "true") {
      permisionData.manageDates = true
    }

    const schedule = formData.get("schedule")?.toString() ?? "false"
    if (schedule === "true") {
      permisionData.schedule = true
    }

    const reschedule = formData.get("reschedule")?.toString() ?? "false"
    if (reschedule === "true") {
      permisionData.reschedule = true
    }

    const ratm = formData.get("ratm")?.toString() ?? "false"
    if (ratm === "true") {
      permisionData.ratm = true
    }
    
    const manageMeasureModel = formData.get("manageMeasureModel")?.toString() ?? "false"
    if (manageMeasureModel === "true") {
      permisionData.manageMeasureModel = true
    }
    
    const discard = formData.get("discard")?.toString() ?? "false"
    if (discard === "true") {
      permisionData.discard = true
    }

    const consult = formData.get("consult")?.toString() ?? "false"
    if (consult === "true") {
      permisionData.consult = true
    }
    
    console.log(permisionData)
    
    const res = await APPROVE_USER(id, token)
    
    if (res === 200) {
      const res2 = await UPDATE_PERMISSIONS(id, token, permisionData)
      if (res2 === 200) {
        action()
        setLoadingActive(false)
        window.location.reload()
      }
    }
    setLoadingActive(false)
  }

  return (
    <div className="w-full flex items-center justify-center">
      <Loading active={loadingActive} />
      <div className="w-full rounded-lg md:w-4/5 h-4/5 flex flex-col items-center justify-center p-5 gap-5 bg-primary">
        <div className="w-full flex items-center justify-between">
          <h1>Selecione as permissões para o usuário "{name}"</h1>
          <button form="FormConfirm" >fechar</button>
        </div>

        <form id="FormConfirm" onSubmit={handleConfirm} className="w-full flex flex-col items-start justify-start lg:grid lg:grid-cols-2 gap-1">
          {permisions.map((item, index) => {
            return (
              <PermisionItem key={index} id={item.id} name={item.name} />
            )
          })}
        </form>
      </div>
    </div>
  )
}