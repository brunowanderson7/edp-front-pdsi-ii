import ButtonUI from "@/components/button/ButtonUI"
import {ChecklistParalelUI} from "@/components/checklist/ChecklistParalelUI"

import Check from "../checkedp"


import { FormEvent } from "react"
import CheckMulti from "../checkedp/CheckMulti"

interface PartOneProps {
  prefix: string
}

export const PartOne = ({prefix}: PartOneProps) => {

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const field1_op1 = formData.get(`${prefix}-analise-item-0-edp`)?.toString() ?? 'off'
    const field1_op2 = formData.get(`${prefix}-analise-item-1-cliente`)?.toString() ?? 'off'

    const field2_op1 = formData.get(`${prefix}-cliente-item-0-sim`)?.toString() ?? 'off'
    const field2_op2 = formData.get(`${prefix}-cliente-item-1-não`)?.toString() ?? 'off'

    const field3_op1 = formData.get(`${prefix}-ensaio-item-0-aprovado`)?.toString() ?? 'off'
    const field3_op2 = formData.get(`${prefix}-ensaio-item-1-reprovado`)?.toString() ?? 'off'
    
    const field4_op1 = formData.get(`${prefix}-dieletrico-item-0-aprovado`)?.toString() ?? 'off'
    const field4_op2 = formData.get(`${prefix}-dieletrico-item-1-reprovado`)?.toString() ?? 'off'


    console.log('Op EDP:', field1_op1)
    console.log('Op Cliente:', field1_op2)

    console.log('Op Sim:', field2_op1)
    console.log('Op Não:', field2_op2)

    console.log('Op Aprovado:', field3_op1)
    console.log('Op Reprovado:', field3_op2)

    console.log('Op D Aprovado:', field4_op1)
    console.log('Op D Reprovado:', field4_op2)
  }

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      <div className="w-full flex flex-col gap-3 relative md:flex md:flex-row md:justify-around">
        <div className="w-full flex items-start justify-start bg-primary/10 md:border border-white p-2 md:w-1/3">
          <Check.Root type="column">
            <Check.Label title="Análise a pedido" />
            <CheckMulti data={[{id: 1, title: 'Aprovado', value: false}, {id: 2, title: 'Reprovado', value: false}]} />
          </Check.Root>
        </div>
        <div className="w-full flex items-start justify-start bg-primary/10 md:border border-white p-2 md:w-1/3">
          <ChecklistParalelUI 
            prefix={`${prefix}-cliente`}
            title='Cliente acompanhou'
            itens={['Sim', 'Não']}
          />
        </div>
        <div className="w-full flex items-start justify-start bg-primary/10 md:border border-white p-2 md:w-1/3">
          <ChecklistParalelUI 
            prefix={`${prefix}-ensaio`}
            title='Ensaio visual'
            itens={['Aprovado', 'Reprovado']}
          />
        </div>
        <div className="w-full flex items-start justify-start bg-primary/10 md:border border-white p-2 md:w-1/3">
          <ChecklistParalelUI 
            prefix={`${prefix}-dieletrico`}
            title='Dielétrico'
            itens={['Aprovado', 'Reprovado']}
          />
        </div>
        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>

  )
}