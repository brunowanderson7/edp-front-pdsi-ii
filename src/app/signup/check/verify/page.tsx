'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ButtonUI from '@/components/button/ButtonUI'
import Routes from '@/utils/Routes'
import { USER_VERIFY } from '@/services/auth/verify'


export default function Verify() {

  const searchParams = useSearchParams()
  const [id, token] = [searchParams.get('id'), searchParams.get('token')]
  const router = useRouter()

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const verify = async () => {
      try {
        if (id && token) {
          const data = await USER_VERIFY(id, token)
          if (data) {
            console.log(data)
            setChecked(true)
            // setTimeout(() => {
            //   router.push(Routes.login)
            // }, 7000)
          }
        }
      } catch (error) {
        console.log(error)
        setChecked(false)
      }
    }
    verify()

  }, [searchParams])



  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-center justify-center pb-14 px-5 lg:px-36">
          

          {checked ? 
            <div className='flex flex-col items-center justify-center text-center gap-8 lg:px-14 transition-all duration-1000'>
              <svg xmlns="http://www.w3.org/2000/svg" width="230" height="215" viewBox="0 0 230 215" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M96.7801 0.536012C122.056 -1.9971 147.412 4.50238 168.353 18.882L157.921 34.0728C140.57 22.1581 119.561 16.7727 98.6177 18.8716C77.6747 20.9705 58.1515 30.418 43.51 45.5389C28.8685 60.6599 20.0547 80.4772 18.6315 101.477C17.2082 122.477 23.2674 143.302 35.7347 160.26C48.2021 177.218 66.2719 189.214 86.7402 194.119C107.209 199.025 128.753 196.524 147.553 187.059C166.353 177.595 181.194 161.778 189.444 142.415C197.695 123.051 201.289 102.888 195.092 82.773L208.085 69.5713C222.125 96.8129 216.354 126.269 206.397 149.638C196.44 173.008 178.528 192.096 155.839 203.519C133.15 214.941 107.148 217.96 82.4454 212.039C57.7426 206.119 35.9344 191.642 20.8878 171.175C5.84123 150.709 -1.47154 125.575 0.246176 100.231C1.96389 74.8866 12.6011 50.9695 30.2717 32.7203C47.9422 14.4711 71.5044 3.06912 96.7801 0.536012ZM33.9474 117.768L88.4308 176.861L229.249 22.2126L198.655 2.93386L93.0409 131.598L56.9981 102.89L33.9474 117.768Z" fill="#07FFFF"/>
              </svg>
              <p>Seu email foi verificado com sucesso, espere até que um administrador aprove seu acesso ao sistema.</p>
              <div className='w-64'>
                <ButtonUI title="Inicio" typeButton="outline" onClick={() => router.push(Routes.login)} />
              </div>
            </div> :
            <div className='flex flex-col items-center justify-center text-center gap-5 lg:px-14'>
              <Image src={'/logo.png'} alt="logo" width={106} height={106} className='animate-spin' />
              <p>Verificando seu email...</p>
            </div>

            
          }
        </div>

        
      </div>
    </main>
  )
}
