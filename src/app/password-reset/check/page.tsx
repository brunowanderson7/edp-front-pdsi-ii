'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import ButtonUI from '@/components/button/ButtonUI'
import Routes from '@/utils/Routes'


export default function Check() {

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:rounded-xl lg:bg-primary/10 lg:shadow-md lg:max-w-[976px]">
        <div className="flex flex-1 items-center justify-center pb-14 lg:p-36">
          <Image src={'/logo.png'} alt="logo" width={106} height={106} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 lg:p-14 p-4 text-center text-[16px] font-medium">
          <h1>Clique no link que você recebeu no email <span className='text-accent'>{email}</span> para redefinir sua senha, verifique também sua caixa de span!</h1>

          <div className='w-full flex items-center justify-center'>
            <ButtonUI title="Confirmei" typeButton="default" onClick={() => router.push(Routes.login)} />
          </div>
        </div>
      </div>
    </main>
  )
}
