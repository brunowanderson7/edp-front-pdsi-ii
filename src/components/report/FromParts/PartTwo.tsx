import ButtonUI from "@/components/button/ButtonUI"
import { ChecklistParalelUI } from "@/components/checklist/ChecklistParalelUI";
import ScanBarCode from "@/components/scanbarcode/ScanBarCode";
import { FormEvent } from "react";


interface PartOneProps {
  prefix: string
}

export const PartTwo = ({prefix}: PartOneProps) => {

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // Invólucro
    const field1_barcode = formData.get(`${prefix}-lacre-incolucro-barcode`)?.toString() ?? ''
    const field1_op1 = formData.get(`${prefix}-lacre-involucro-item-0-emordem`)?.toString() ?? 'off'
    const field1_op2 = formData.get(`${prefix}-lacre-involucro-item-1-violado`)?.toString() ?? 'off'
    const field1_op3 = formData.get(`${prefix}-lacre-involucro-item-2-semlacre`)?.toString() ?? 'off'

    // Lacre 1
    const field2_barcode = formData.get(`${prefix}-lacre1`)?.toString() ?? ''
    const field2_op1 = formData.get(`${prefix}-lacre1-item-0-emordem`)?.toString() ?? 'off'
    const field2_op2 = formData.get(`${prefix}-lacre1-item-1-violado`)?.toString() ?? 'off'
    const field2_op3 = formData.get(`${prefix}-lacre1-item-2-semlacre`)?.toString() ?? 'off'

    // Lacre 2
    const field3_barcode = formData.get(`${prefix}-lacre2`)?.toString() ?? ''
    const field3_op1 = formData.get(`${prefix}-lacre2-item-0-emordem`)?.toString() ?? 'off'
    const field3_op2 = formData.get(`${prefix}-lacre2-item-1-violado`)?.toString() ?? 'off'
    const field3_op3 = formData.get(`${prefix}-lacre2-item-2-semlacre`)?.toString() ?? 'off'
    const field3_op4 = formData.get(`${prefix}-lacre2-item-3-n/a`)?.toString() ?? 'off'


    console.log('Barcode Invólucro:', field1_barcode)
    console.log('Inv Op 1:', field1_op1)
    console.log('Inv Op 2:', field1_op2)
    console.log('Inv Op 3:', field1_op3)

    console.log('Barcode Lacre 1:', field2_barcode)
    console.log('Lacre 1 Op 1:', field2_op1)
    console.log('Lacre 1 Op 2:', field2_op2)
    console.log('Lacre 1 Op 3:', field2_op3)

    console.log('Barcode Lacre 2:', field3_barcode)
    console.log('Lacre 2 Op 1:', field3_op1)
    console.log('Lacre 2 Op 2:', field3_op2)
    console.log('Lacre 2 Op 3:', field3_op3)
    console.log('Lacre 2 Op 4:', field3_op4)
  }

  

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      <div className="w-full flex flex-col gap-3 relative md:flex md:flex-row md:justify-around">
        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ScanBarCode title="Lacre Invólucro" idName={`${prefix}-lacre-incolucro-barcode`} />
          <ChecklistParalelUI 
            prefix={`${prefix}-lacre-involucro`}
            title='Status invólucro'
            itens={['Em ordem', 'Violado', 'Sem lacre']}
          />
        </div>

        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ScanBarCode title="Lacre 1" idName={`${prefix}-lacre1`} />
          <ChecklistParalelUI 
            prefix={`${prefix}-lacre1`}
            title='Status lacre 1'
            itens={['Em ordem', 'Violado', 'Sem lacre']}
          />
        </div>

        <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white p-2 gap-3 md:w-1/3">
          <ScanBarCode title="Lacre 2" idName={`${prefix}-lacre2`} />
          <ChecklistParalelUI 
            prefix={`${prefix}-lacre2`}
            title='Status lacre 2'
            itens={['Em ordem', 'Violado', 'Sem lacre', 'N/A']}
          />
        </div>

        
      </div>
      <ButtonUI title="Salvar" onClick={() => {}} typeButton="default" />
    </form>

  )
}