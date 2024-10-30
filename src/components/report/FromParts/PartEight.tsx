import ButtonUI from "@/components/button/ButtonUI"
import {ChecklistParalelUI} from "@/components/checklist/ChecklistParalelUI"
import SelectUI from "@/components/select/SelectUI"


import { FormEvent } from "react"

interface PartEightProps {
  prefix: string
}

export const PartEight = ({prefix}: PartEightProps) => {

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // const field1_op1 = formData.get(`${prefix}-analise-item-0-edp`)?.toString() ?? 'off'
    // const field1_op2 = formData.get(`${prefix}-analise-item-1-cliente`)?.toString() ?? 'off'

    // const field2_op1 = formData.get(`${prefix}-cliente-item-0-sim`)?.toString() ?? 'off'
    // const field2_op2 = formData.get(`${prefix}-cliente-item-1-não`)?.toString() ?? 'off'

    // const field3_op1 = formData.get(`${prefix}-ensaio-item-0-aprovado`)?.toString() ?? 'off'
    // const field3_op2 = formData.get(`${prefix}-ensaio-item-1-reprovado`)?.toString() ?? 'off'
    
    // const field4_op1 = formData.get(`${prefix}-dieletrico-item-0-aprovado`)?.toString() ?? 'off'
    // const field4_op2 = formData.get(`${prefix}-dieletrico-item-1-reprovado`)?.toString() ?? 'off'


    // console.log('Op EDP:', field1_op1)
    // console.log('Op Cliente:', field1_op2)

    // console.log('Op Sim:', field2_op1)
    // console.log('Op Não:', field2_op2)

    // console.log('Op Aprovado:', field3_op1)
    // console.log('Op Reprovado:', field3_op2)

    // console.log('Op D Aprovado:', field4_op1)
    // console.log('Op D Reprovado:', field4_op2)
  }

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      <div className="w-full flex flex-col gap-3 relative md:flex md:flex-row md:justify-around">
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ChecklistParalelUI 
            title="Medidor quebrado/furado?"
            prefix={`${prefix}-medidor-quebrado-furado`}
            itens={['Sim', 'Não']}
          />
          <ChecklistParalelUI 
            title="Display apagado/não liga?"
            prefix={`${prefix}-display-apagado`}
            itens={['Sim', 'Não']}
          />
          <ChecklistParalelUI 
            title="Facilidade de acesso ao interior do medidor?"
            prefix={`${prefix}-acesso-interior-medidor`}
            itens={['Sim', 'Não']}
          />
        </div>

        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ChecklistParalelUI 
            title="Bobina danificada?"
            prefix={`${prefix}-bobina-danificada`}
            itens={['Sim', 'Não']}
          />
          <ChecklistParalelUI 
            title="Aparentemente em ordem?"
            prefix={`${prefix}-aparentemente-ordem`}
            itens={['Sim', 'Não']}
          />
          <ChecklistParalelUI 
            title="Reprovado dielétrico?"
            prefix={`${prefix}-reprovado-dieletrico`}
            itens={['Sim', 'Não']}
          />
        </div>
        
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ChecklistParalelUI 
            title="Corpo estranho no interior do medidor?"
            prefix={`${prefix}-corpo-estranho-interior`}
            itens={['Sim', 'Não']}
          />
          <ChecklistParalelUI 
            title="Borne queimado?"
            prefix={`${prefix}-borne-queimado`}
            itens={['Sim', 'Não']}
          />
        </div>
        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>

  )
}