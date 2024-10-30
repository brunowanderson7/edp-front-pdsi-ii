'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'

import Input from '@/components/input'
import ButtonUI from '@/components/button/ButtonUI'
import Loading from '@/components/loading/loading'
import { PASSWORD_RECOVERY } from '@/services/auth/passwordRecovery'


export default function PasswordReset() {

  const [loadingActive, setLoadingActive] = useState(false);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    setLoadingActive(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const mail = formData.get("email")?.toString() ?? ""

    if (mail !== "") {
      const msg = await PASSWORD_RECOVERY(mail)
      if (msg !== undefined) {
        setLoadingActive(false)
        alert(msg)
      }
    } else {
      setLoadingActive(false)
      alert("Preencha seu email")
    }
  }


  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <Loading active={loadingActive} />
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:rounded-xl lg:bg-primary/10 lg:shadow-md lg:max-w-[976px]">
        <div className="flex flex-1 items-center justify-center pb-14 lg:p-36">
          <Image src={'/logo.png'} alt="logo" width={106} height={106} />
        </div>

        <form onSubmit={handleEmailSubmit} className="flex flex-1 flex-col items-center justify-center text-center gap-3 lg:p-14">
          <h1 className='mb-5'>Insira seu email cadastrado para redefinir sua senha</h1>
          <Input.Root>
            <Input.Label title="Email" />
            <Input.Field idData="email" typeInput="email" />
          </Input.Root>

          <ButtonUI title="Enviar" typeButton="default" />    
        </form>
      </div>
    </main>
  )
}
