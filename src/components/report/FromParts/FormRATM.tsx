import ButtonUI from "@/components/button/ButtonUI"

import Check from "../checkedp"


import { FormEvent, useEffect, useState } from "react"
import CheckMulti, { StateData } from "../checkedp/CheckMulti"
import { QuestionRoot } from "./QuestionRoot"
import ScanBarCode from "@/components/scanbarcode/ScanBarCode"
import Input from "@/components/input"
import SelectUI from "@/components/select/SelectUI"
import CheckLabel from "../checkedp/CheckLabel"
import { UpImage } from "@/components/upimage/UpImage"


const baseMesas = [
  {id: 1, title: '45079', value: false},
  {id: 2, title: '4137', value: false},
  {id: 3, title: '49093', value: false}
]

const baseABCNaoAplicavel = [
  {id: 1, title: 'A', value: false},
  {id: 2, title: 'B', value: false},
  {id: 3, title: 'C', value: false},
  {id: 4, title: 'N/A', value: false}
]


const baseAprovado = {id: 1, title: 'Aprovado', value: false}
const baseReprovado = {id: 2, title: 'Reprovado', value: false}

const baseSim = {id: 1, title: 'Sim', value: false}
const baseNao = {id: 2, title: 'Não', value: false}

const baseEDP = {id: 1, title: 'EDP', value: false}
const baseCliente = {id: 2, title: 'Cliente', value: false}

const baseEmOrdem = {id: 1, title: 'Em ordem', value: false}
const baseViolado = {id: 2, title: 'Violado', value: false}
const baseSemLacre = {id: 3, title: 'Sem lacre', value: false}
const baseNaoAplicavel = {id: 4, title: 'N/A', value: false}


const baseApagado = {id: 1, title: 'Apagado', value: false}
const baseSemLeitura = {id: 2, title: 'S/Leitura', value: false}
const baseIlegivel = {id: 3, title: 'Ilegível', value: false}
const baseMenos100 = {id: 1, title: '-100', value: false}

const AprovadoReprovado = [baseAprovado, baseReprovado]
const AprovadoReprovadoNaoAplicavel = [baseAprovado, baseReprovado, baseNaoAplicavel]
const SimNao = [baseSim, baseNao]
const EmOrdemVioladoSemLacre = [baseEmOrdem, baseViolado, baseSemLacre]
const EmOrdemVioladoSemLacreNaoAplicavel = [baseEmOrdem, baseViolado, baseSemLacre, baseNaoAplicavel]
const Menos100NaoAplicavel = [baseMenos100, baseNaoAplicavel]
const ApagadoSemLeituraIlegivel = [baseApagado, baseSemLeitura, baseIlegivel]


import { ADD_RATM, InputRATM } from "@/services/input/ratm"
import Loading from "@/components/loading/loading"
import { useRouter } from "next/navigation"
import Routes from "@/utils/Routes"



interface FormRATMProps {
  prefix: string
  token: string

  fieldsObservations: string
  fieldAgent: string
  meterId: string
}

export const FormRATMP = ({prefix, token, fieldsObservations, fieldAgent, meterId}: FormRATMProps) => {

  const [loadingActive, setLoadingActive] = useState(false);

  const [trigger, setTrigger] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const [statesQuestions, setStatesQuestions] = useState<number[]>(
    [
      -1, -1, -1, -1,
      -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1,
      -1, -1,
      -1,
      -1,
    ]
  
  )


  const handleStateChange = (index: number, newValue: number) => {
    const newStates = [...statesQuestions];
    newStates[index] = newValue;
    console.log('newStates:', newStates)
    setStatesQuestions(newStates);
  };

  const router = useRouter()


  const imagesPath: string[] = []

  const attPath1 = async (path: string) => {
    imagesPath.push(path)
    setImages(imagesPath)
    console.log(imagesPath) 

    if (imagesPath.length === 5) {
      setLoadingActive(false)
    }
  }

  const attPath2 = async (path: string) => {
    imagesPath.push(path)
    setImages(imagesPath)
    console.log(imagesPath) 

    if (imagesPath.length === 5) {
      setLoadingActive(false)
    }
  }

  const attPath3 = async (path: string) => {
    imagesPath.push(path)
    setImages(imagesPath)
    console.log(imagesPath)
    
    if (imagesPath.length === 5) {
      setLoadingActive(false)
    }
  }

  const attPath4 = async (path: string) => {
    imagesPath.push(path)
    setImages(imagesPath)
    console.log(imagesPath) 

    if (imagesPath.length === 5) {
      setLoadingActive(false)
    }
  }

  const attPath5 = async (path: string) => {
    imagesPath.push(path)
    setImages(imagesPath)
    console.log(imagesPath)

    if (imagesPath.length === 5) {
      setLoadingActive(false)
    }
  }



  const saveData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingActive(true)


    if (statesQuestions.includes(-1)) {
      alert('Preencha todos os campos')
      setLoadingActive(false)
      return
    } else {

      try {
        const data: InputRATM = {} as InputRATM

        // data.id = prefix
        data.meterId = prefix

        // bloco 1

        data.analyzeOrder = statesQuestions[0] === 1 ? 'EDP' : 'Cliente'
        data.clientAccompanied = statesQuestions[1] === 1 ? true : false
        data.rehearsalVisual = statesQuestions[2] === 1 ? 'Aprovado' : 'Reprovado'
        data.dielectric = statesQuestions[3] === 1 ? 'Aprovado' : 'Reprovado'


        // bloco 2

        data.sealInvolucro = (document.getElementById(`${prefix}-lacre-incolucro-barcode`) as HTMLInputElement).value || ''
        data.statusInvolucro = statesQuestions[4] === 1 ? 'Em ordem' : statesQuestions[4] === 2 ? 'Violado' : 'Sem lacre'


        data.seal1 = (document.getElementById(`${prefix}-lacre1`) as HTMLInputElement).value || ''
        data.statusLacre1 = statesQuestions[5] === 1 ? 'Em ordem' : statesQuestions[5] === 2 ? 'Violado' : 'Sem lacre'
        

        data.seal2 = (document.getElementById(`${prefix}-lacre2`) as HTMLInputElement).value || ''
        data.statusLacre2 = statesQuestions[6] === 1 ? 'Em ordem' : statesQuestions[6] === 2 ? 'Violado' : statesQuestions[6] === 2 ? 'Sem lacre' : 'N/A'


        // bloco 3

        data.tableTest = statesQuestions[7] === 1 ? '45079' : statesQuestions[7] === 2 ? '4137' : '49093'

        let readingMeter = (document.getElementById(`${prefix}-leitura-medidor`) as HTMLInputElement).value || ''
        if (readingMeter !== '') {
          data.readingMeter = readingMeter
        } else {
          data.readingMeter = statesQuestions[8] === 1 ? 'Apagado' : statesQuestions[8] === 2 ? 'S/Leitura' : 'Ilegível'
        }

        let cn = (document.getElementById(`${prefix}-cn`) as HTMLInputElement).value || ''
        if (cn !== '') {
          data.cn = cn
        } else {
          data.cn = statesQuestions[9] === 1 ? '-100' : 'N/A'
        }

        let cnri = (document.getElementById(`${prefix}-cn-ri`) as HTMLInputElement).value || ''
        if (cnri !== '') {
          data.cnri = cnri
        } else {
          data.cnri = statesQuestions[10] === 1 ? '-100' : 'N/A'
        }

        let cnrc = (document.getElementById(`${prefix}-cn-rc`) as HTMLInputElement).value || ''
        if (cnrc !== '') {
          data.cnrc = cnrc
        } else {
          data.cnrc = statesQuestions[11] === 1 ? '-100' : 'N/A'
        }

        let ci = (document.getElementById(`${prefix}-ci`) as HTMLInputElement).value || ''
        if (ci !== '') {
          data.ci = ci
        } else {
          data.ci = statesQuestions[12] === 1 ? '-100' : 'N/A'
        }

        let cp = (document.getElementById(`${prefix}-cp`) as HTMLInputElement).value || ''
        if (cp !== '') {
          data.cp = cp
        } else {
          data.cp = statesQuestions[13] === 1 ? '-100' : 'N/A'
        }


        // bloco 4 

        data.march = statesQuestions[14] === 1 ? 'Aprovado' : statesQuestions[14] ===  2 ? 'Reprovado' : 'N/A'
        data.register = statesQuestions[15] === 1 ? 'Aprovado' : 'Reprovado'


        // bloco 5

        let phaseInterrupted = (document.getElementById(`${prefix}-fase-interronpida`) as HTMLInputElement).value || ''
        if (phaseInterrupted !== '') {
          data.phaseInterrupted = phaseInterrupted
        } else {
          data.phaseInterrupted = statesQuestions[16] === 1 ? 'A' : statesQuestions[16] === 2 ? 'B' : statesQuestions[16] === 3 ? 'C' : 'N/A'
        }

        data.codeIrregularity = (document.getElementById(`${prefix}-codigo-irregularidade`) as HTMLInputElement).value || ''
        data.descriptionIrregularity = (document.getElementById(`${prefix}-observacao-irregularidade`) as HTMLInputElement).value || ''

        data.observationsIrregularity = (document.getElementById(`${prefix}-observacao-irregularidade`) as HTMLInputElement).value || ''

        // bloco resultados do ensaio
        
        data.meterBroken = statesQuestions[18] === 1 ? true : false
        data.displayOff = statesQuestions[19] === 1 ? true : false
        data.easeAccess = statesQuestions[20] === 1 ? true : false
        data.coilDamaged = statesQuestions[21] === 1 ? true : false
        data.apparentlyOrder = statesQuestions[22] === 1 ? true : false
        data.failedDielectric = statesQuestions[23] === 1 ? true : false
        data.strangeBody = statesQuestions[24] === 1 ? true : false
        data.burntBorne = statesQuestions[25] === 1 ? true : false

        console.log('data:', data)
        

        data.photoUrls = images

        const res = await ADD_RATM({token: token, data: data})
        console.log(res)
        if (res) {
          alert('RATM salvo com sucesso')
          router.push(Routes.menu)
        }
      } catch (error) {
        alert('Erro ao salvar os dados')
        console.error(error)
      }
    }
  }

  return (
    <form id={prefix} onSubmit={saveData} className="w-full h-full flex flex-col justify-between p-3 gap-3">
      { loadingActive && <Loading active={loadingActive} /> }
      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-2 pb-14">
        <div className="col-span-2 flex items-center justify-center uppercase text-lg text-text">
          RATM
          <div className="text-yellow-400 text-lg">{statesQuestions}</div>
        </div>
        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Análise a pedido" />
            <CheckMulti onChange={handleStateChange} index={0} data={[baseEDP, baseCliente]} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Cliente acompanhou" />
            <CheckMulti onChange={handleStateChange} index={1} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Ensaio visual" />
            <CheckMulti onChange={handleStateChange} index={2} data={AprovadoReprovado} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Dielétrico" />
            <CheckMulti onChange={handleStateChange} index={3} data={AprovadoReprovado} />
          </Check.Root>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-3 pb-14">
        <QuestionRoot>
          <ScanBarCode title="Lacre Invólucro" idName={`${prefix}-lacre-incolucro-barcode`} />
          <Check.Root type="column">
            <Check.Label title="Status invólucro" />
            <CheckMulti onChange={handleStateChange} index={4} data={EmOrdemVioladoSemLacre} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <ScanBarCode title="Lacre 1" idName={`${prefix}-lacre1`} />
          <Check.Root type="column">
            <Check.Label title="Status lacre 1" />
            <CheckMulti onChange={handleStateChange} index={5} data={EmOrdemVioladoSemLacre} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <ScanBarCode title="Lacre 2" idName={`${prefix}-lacre2`} />
          <Check.Root type="column">
            <Check.Label title="Status lacre 2" />
            <CheckMulti onChange={handleStateChange} index={6} data={EmOrdemVioladoSemLacreNaoAplicavel} />
          </Check.Root>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-3 pb-14">
        <div className="col-span-3">
          <QuestionRoot>
            <Check.Root type="column">
              <Check.Label title="Mesa de ensaio" />
              <CheckMulti onChange={handleStateChange} index={7} data={baseMesas} />
            </Check.Root>
          </QuestionRoot>
        </div>
        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="Leitura do medidor" />
            <Input.Field idData={`${prefix}-leitura-medidor`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={8} type="row" data={ApagadoSemLeituraIlegivel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="CN" />
            <Input.Field idData={`${prefix}-cn`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={9} type="row" data={Menos100NaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="CN_R_I" />
            <Input.Field idData={`${prefix}-cn-ri`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={10} type="row" data={Menos100NaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="CN_R_C" />
            <Input.Field idData={`${prefix}-cn-rc`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={11} type="row" data={Menos100NaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="CI" />
            <Input.Field idData={`${prefix}-ci`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={12} type="row" data={Menos100NaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="CP" />
            <Input.Field idData={`${prefix}-cp`} typeInput="text" />
          </Input.Root>

          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={13} type="row" data={Menos100NaoAplicavel} />
          </Check.Root>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-2 pb-14">
        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Marcha" />
            <CheckMulti onChange={handleStateChange} index={14} data={AprovadoReprovadoNaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Registrador" />
            <CheckMulti onChange={handleStateChange} index={15} data={AprovadoReprovado} />
          </Check.Root>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-3 pb-14">
        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="Fase Interronpida" />
            <Input.Field idData={`${prefix}-fase-interronpida`} typeInput="text" />
          </Input.Root>
          <Check.Root>
            <CheckMulti onChange={handleStateChange} index={16} type="row" data={baseABCNaoAplicavel} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <SelectUI title="Código da Irregularidade" idName={`${prefix}-codigo-irregularidade`} options={['1', '2', '3', 'Selecione']} />
        </QuestionRoot>

        <QuestionRoot>
          <Input.Root wfull>
            <Input.Label title="Observações da Irregularidade" />
            <Input.Field idData={`${prefix}-observacao-irregularidade`} typeInput="text" />
          </Input.Root>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-3 pb-14">
        <QuestionRoot>
          <Check.Root type="column">
            <CheckLabel title="Laudo de campo está correto?" />
            <CheckMulti onChange={handleStateChange} index={17} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
        <SelectUI title="Código da Irregularidade" idName={`${prefix}-codigo-irregularidade-campo`} options={['1', '2', '3', 'Selecione']} />
        </QuestionRoot>

        <QuestionRoot>
          Observação de campo: {fieldsObservations}<br/>

          Trabalho em campo feito por: {fieldAgent}<br/>
        </QuestionRoot>
      </div>

      <div className="w-full flex flex-col gap-3 relative md:grid md:grid-cols-2 pb-14">
        <div className="col-span-2 flex items-center justify-center uppercase text-lg text-text">
          resultados do ensaio
        </div>
        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Medidor quebrado/furado?" />
            <CheckMulti onChange={handleStateChange} index={18} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Display apagado/não liga?" />
            <CheckMulti onChange={handleStateChange} index={19} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Facilidade de acesso ao interior do medidor?" />
            <CheckMulti onChange={handleStateChange} index={20} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Bobina danificada?" />
            <CheckMulti onChange={handleStateChange} index={21} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Aparentemente em ordem?" />
            <CheckMulti onChange={handleStateChange} index={22} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Reprovado dielétrico?" />
            <CheckMulti onChange={handleStateChange} index={23} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Corpo estranho no interior do medidor?" />
            <CheckMulti onChange={handleStateChange} index={24} data={SimNao} />
          </Check.Root>
        </QuestionRoot>

        <QuestionRoot>
          <Check.Root type="column">
            <Check.Label title="Borne queimado?" />
            <CheckMulti onChange={handleStateChange} index={25} data={SimNao} />
          </Check.Root>
        </QuestionRoot>
      </div>

      {
        images.length > 4 ? (
          <div className="w-full flex flex-col gap-3 relative pb-48">
            <QuestionRoot>
              <ButtonUI title="Salvar RATM" typeButton="default" />
            </QuestionRoot>
          </div>
        ):(
          <>
            <div className="w-full flex flex-col gap-3 relative pb-14">
              <div className="col-span-2 flex items-center justify-center uppercase text-lg text-text">
                imagens do medidor
              </div>

              <QuestionRoot>
                <UpImage id={`01-${prefix}`} token={token} updatePath={attPath1} start={trigger} />
              </QuestionRoot>

              <QuestionRoot>
                <UpImage id={`02-${prefix}`} token={token} updatePath={attPath2} start={trigger} />
              </QuestionRoot>

              <QuestionRoot>
                <UpImage id={`03-${prefix}`} token={token} updatePath={attPath3} start={trigger} />
              </QuestionRoot>

              <QuestionRoot>
                <UpImage id={`04-${prefix}`} token={token} updatePath={attPath4} start={trigger} />
              </QuestionRoot>

              <QuestionRoot>
                <UpImage id={`05-${prefix}`} token={token} updatePath={attPath5} start={trigger} />
              </QuestionRoot>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-3 relative pb-48">
              <p>CARREGUE AS IMAGENS PARA GERAR O RELATÓRIO</p>
              <QuestionRoot>
                <ButtonUI type="button" onClick={() => {
                  setTrigger(!trigger)
                  setLoadingActive(true)
                }} title="Carregar Imagens" typeButton="default" />
              </QuestionRoot>
            </div>
          </>
        )
      }


    </form>

  )
}