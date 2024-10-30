'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Input from '@/components/input'
import ButtonUI from '@/components/button/ButtonUI'
import Loading from '@/components/loading/loading'
import { USER_SIGNUP } from '@/services/auth/signup'


export default function Signup() {
  const router = useRouter()
  const [loadingActive, setLoadingActive] = useState(false);

  
  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    setLoadingActive(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")?.toString() ?? ""
    const mail = formData.get("email")?.toString() ?? ""
    const pass = formData.get("password")?.toString() ?? ""
    const pass2 = formData.get("password2")?.toString() ?? ""

    if (pass !== pass2) {
      console.log('As senhas não são iguais')
      alert('As senhas não são iguais')
      setLoadingActive(false)
    } else if (name === '' || mail === '' || pass === '' || pass2 === '') {
      console.log('Preencha todos os campos')
      alert('Preencha todos os campos')
      setLoadingActive(false)
    } else if (pass.length < 8) {
      console.log('A senha deve conter no mínimo 8 caracteres')
      alert('A senha deve conter no mínimo 8 caracteres')
      setLoadingActive(false)
    } else {
      const msg = await USER_SIGNUP(name, mail, pass)
      if (msg) {
        setLoadingActive(false)
        console.log(msg)
        alert(msg)
      }
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

        <div className="flex flex-1 flex-col items-center justify-center gap-3 lg:p-14">
          <form onSubmit={handleSignup} id='FormSignup' className='flex w-full flex-col items-center justify-center gap-3'>
            <Input.Root>
              <Input.Label title="Nome" />
              <Input.Field idData="name" typeInput="text" />
            </Input.Root>

            <Input.Root>
              <Input.Label title="Email" />
              <Input.Field idData="email" typeInput="email" />
            </Input.Root>

            <Input.Root>
              <Input.Label title="Senha" />
              <Input.Field idData="password" typeInput="password" />
            </Input.Root>

            <Input.Root>
              <Input.Label title="Repita sua senha" />
              <Input.Field idData="password2" typeInput="password" />
            </Input.Root>
          </form>

          <div className='w-full grid grid-cols-2 gap-4 items-center justify-center'>
            <ButtonUI title="Voltar" typeButton="outline" onClick={router.back} />
            <ButtonUI title="Cadastre se" typeButton="default" form='FormSignup' />
          </div>
        </div>
      </div>
    </main>
  )
}
