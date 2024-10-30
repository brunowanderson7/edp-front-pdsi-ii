'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'

import Input from '@/components/input'
import ButtonUI from '@/components/button/ButtonUI'
import Routes from '@/utils/Routes'
import Loading from '@/components/loading/loading'
import { USER_LOGIN } from '@/services/auth/login'


export default function Home() {

  const [loadingActive, setLoadingActive] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setLoadingActive(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const mail = formData.get("email")?.toString() ?? ""
    const pass = formData.get("password")?.toString() ?? ""

    if (mail !== "" || pass !== "") {
      const msg = await USER_LOGIN(mail, pass)
      if (msg !== undefined) {
        alert(msg)
      }
    } else {
      setLoadingActive(false)
      alert("Preencha todos os campos")
    }
    setLoadingActive(false)
  }


  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <Loading active={loadingActive} />
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:rounded-xl lg:bg-primary/10 lg:shadow-md lg:max-w-[976px]">
        <div className="flex flex-1 items-center justify-center pb-14 lg:p-36">
          <Image src={'/logo.png'} alt="logo" width={106} height={106} />
        </div>

        <form onSubmit={handleLogin} className="flex flex-1 flex-col items-center justify-center gap-3 lg:p-14">
          <Input.Root>
            <Input.Label title="Email" />
            <Input.Field idData="email" typeInput="email" />
          </Input.Root>

          <Input.Root>
            <Input.Label title="Senha" />
            <Input.Field idData="password" typeInput="password" />
          </Input.Root>

          <div className="flex w-full items-end justify-end text-text">
            <a href={Routes.reset}>Esqueceu sua senha?</a>
          </div>

          <ButtonUI title="Entrar" typeButton="default" />

          <div className="flex w-full items-center justify-center text-text">
            <h1>
              Novo Usuário?{' '}
              <a
                className="font-semibold text-primary hover:text-secondary"
                href={Routes.signup}
              >
                Cadastre Se
              </a>
            </h1>
          </div>
        </form>
      </div>
    </main>
  )
}
