'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import ButtonUI from '@/components/button/ButtonUI'
import Routes from '@/utils/Routes'


export default function Wait() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:rounded-xl lg:bg-primary/10 lg:shadow-md lg:max-w-[976px]">
        <div className="flex flex-1 items-center justify-center pb-14 lg:p-36">
          <Image src={'/logo.png'} alt="logo" width={106} height={106} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-y-20 lg:p-14 p-5 text-center">
          <p>
            Sua solicitação está completa, espere até que um administrador aprove seu acesso,
            você receberá um email quando for analizado.
          </p>
          <ButtonUI title="Voltar" typeButton="outline" onClick={() => router.push(Routes.login)} />
        </div>
        
      </div>
    </main>
  )
}
