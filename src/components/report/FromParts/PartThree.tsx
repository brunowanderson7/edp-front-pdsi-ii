import ButtonUI from "@/components/button/ButtonUI"
import { ChecklistParalelUI } from "@/components/checklist/ChecklistParalelUI"
import Input from "@/components/input"

import { FormEvent } from "react"

interface PartThreeProps {
  prefix: string
}

export const PartThree = ({prefix}: PartThreeProps) => {

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
  }

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      <div className="w-full flex flex-col gap-3 relative md:flex md:flex-row md:justify-around">
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <Input.Root wfull>
            <Input.Label title="Leitura do medidor" />
            <Input.Field idData={`${prefix}-leitura-medidor`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-status-leitura`}
            itens={['Apagado', 'Sem leitura', 'Ilegível']}
          />
          <ChecklistParalelUI 
            prefix={`${prefix}-mesa-ensaio`}
            title='Mesa de ensaio'
            itens={['45079', '4137', '49093']}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          
        <Input.Root wfull>
            <Input.Label title="CN" />
            <Input.Field idData={`${prefix}-cn`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-cn-status`}
            // title='Mesa de ensaio'
            itens={['-100', 'N/A']}
          />
          
          <Input.Root wfull>
            <Input.Label title="CN_R_I" />
            <Input.Field idData={`${prefix}-cn-ri`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-cn-ri-status`}
            // title='Mesa de ensaio'
            itens={['-100', 'N/A']}
          />

          <Input.Root wfull>
            <Input.Label title="CN_R_C" />
            <Input.Field idData={`${prefix}-cn-rc`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-cn-rc-status`}
            // title='Mesa de ensaio'
            itens={['-100', 'N/A']}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          
          

          <Input.Root wfull>
            <Input.Label title="CI" />
            <Input.Field idData={`${prefix}-ci`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-ci-status`}
            // title='Mesa de ensaio'
            itens={['-100', 'N/A']}
          />

          <Input.Root wfull>
            <Input.Label title="CP" />
            <Input.Field idData={`${prefix}-cp`} typeInput="text" />
          </Input.Root>
          <ChecklistParalelUI 
            prefix={`${prefix}-cp-status`}
            // title='Mesa de ensaio'
            itens={['-100', 'N/A']}
          />
        </div>

        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>
  )
}
