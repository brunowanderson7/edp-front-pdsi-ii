import ButtonUI from "@/components/button/ButtonUI"
import {ChecklistParalelUI} from "@/components/checklist/ChecklistParalelUI"


import { FormEvent } from "react"

interface PartFourProps {
  prefix: string
}

export const PartFour = ({prefix}: PartFourProps) => {

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    
  }

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      <div className="w-full flex flex-col gap-3 relative md:flex md:flex-row md:justify-around">
        <div className="w-full flex items-start justify-start bg-primary/10 md:border border-white p-2 md:w-1/3">
          <ChecklistParalelUI
            prefix={`${prefix}-marcha`}
            title='Marcha'
            itens={['Aprovado', 'Reprovado', 'N/A']}
          />
        </div>
        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>

  )
}