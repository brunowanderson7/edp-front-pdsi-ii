import ButtonUI from "@/components/button/ButtonUI"
import {ChecklistParalelUI} from "@/components/checklist/ChecklistParalelUI"
import Input from "@/components/input"
import SelectUI from "@/components/select/SelectUI"


import { FormEvent } from "react"

interface PartSixProps {
  prefix: string
}

export const PartSix = ({prefix}: PartSixProps) => {

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
          
          <Input.Root wfull>
            <Input.Label title="Fase Interronpida" />
            <Input.Field idData={`${prefix}-fase-interronpida`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-fase-interronpida-status`}
            itens={['A', 'B', 'C', 'N/A']}
          />
        </div>

        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <SelectUI title="Código da Irregularidade" idName={`${prefix}-codigo-irregularidade`} options={['1', '2', '3', 'Selecione']} />
        </div>
        
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <Input.Root wfull>
            <Input.Label title="Observações da Irregularidade" />
            <Input.Field idData={`${prefix}-observacao-irregularidade`} typeInput="text" />
          </Input.Root>
        </div>
        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>

  )
}